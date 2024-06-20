import path from 'node:path';

export function getResolve() {
    return {
            extensions: ['.tsx', '.ts', '.jsx', '.js', '.json'],
            alias: {
              '@': path.resolve(process.cwd(), 'src')
            },
            fallback: {
              path: false,
              process: false,
              fs: false
            }
    }
}