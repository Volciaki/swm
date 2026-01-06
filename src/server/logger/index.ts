import { LogBuilder, LogLevel } from "./builder";

class Logger {
    private _history: string[];

    constructor() { this._history = [] }

    get history() { return this._history };

    private write(value: string) {
        this.history.push(value);
        console.log(value);
    }

    public debug(value: string) {
        const log = new LogBuilder(value)
            .onlyInDevelopmentEnvironment()
            .setLevel(LogLevel.DEBUG)
            .addDate()
            .build();
        this.write(log);
    }

    public log(value: string) {
        const log = new LogBuilder(value)
            .setLevel(LogLevel.LOG)
            .addDate()
            .build();
        this.write(log);
    }

    public warn(value: string) {
        const log = new LogBuilder(value)
            .setLevel(LogLevel.WARN)
            .addDate()
            .build();
        this.write(log);
    }

    public error(value: string) {
        const log = new LogBuilder(value)
            .setLevel(LogLevel.ERROR)
            .addDate()
            .build();
        this.write(log);
    }
}

export const logger = new Logger();
