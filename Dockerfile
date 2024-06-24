# Build stage for Rust application, using same env as runner
FROM debian:buster-slim as builder

# Install dependencies needed for building Rust application
RUN apt-get update && apt-get install -y \
    build-essential \
    curl \
    libssl-dev \
    pkg-config \
    libpq-dev \
    && curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y \
    && . $HOME/.cargo/env \
    && rustup update stable \
    && rustup default stable

# Create our working dir
RUN mkdir -p /home/app/dotafts

# Move over to our working dir
WORKDIR /home/app/dotafts

# Copy our server dependencies
COPY Cargo.toml Cargo.lock ./

# Copy our source code
COPY ./src/ ./src/
COPY ./data/ ./data/
COPY ./markdown/ ./markdown/

# Build our production server
RUN . $HOME/.cargo/env && cargo build --release

FROM node:22-alpine as nodebuilder

# Set PNPM Env Variables, Necessary for PNPM setup in Docker Env
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
ENV RUNTIME_STAGE="production"

RUN corepack enable

RUN mkdir -p /home/app/dotafts/www

WORKDIR /home/app/dotafts/www

COPY ./www/package.json ./package.json
COPY ./www/pnpm-lock.yaml ./pnpm-lock.yaml

RUN pnpm install --frozen-lockfile

COPY ./www/tsconfig.json ./tsconfig.json
COPY ./www/babel.config.json ./babel.config.json
COPY ./www/webpack/ ./webpack/
COPY ./www/public ./public/
COPY ./www/src/ ./src/

RUN pnpm build

RUN rm -rf node_modules \
    src \
    webpack \
    babel.config.json \
    tsconfig.json

# Runtime stage
FROM debian:buster-slim as runner

# Install necessary runtime dependencies
RUN apt-get update && apt-get install -y \
    libssl-dev \
    ca-certificates \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Create working directory
RUN mkdir -p /app/dotafts
WORKDIR /app/dotafts

# Copy Rust binary and Node.js build artifacts
COPY --from=builder /home/app/dotafts/target/release/dotafts-server /app/dotafts
COPY --from=builder /home/app/dotafts/data /app/dotafts/data
COPY --from=builder /home/app/dotafts/markdown /app/dotafts/markdown
COPY --from=nodebuilder /home/app/dotafts/www/public /app/dotafts/www/public

# Ensure the Rust binary has execution permissions
RUN chmod +x /app/dotafts/dotafts-server


# Run the Rust binary
CMD ["./dotafts-server"]
