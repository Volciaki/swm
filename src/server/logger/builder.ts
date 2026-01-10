import { EnvironmentType } from "../environment/type";
import { environment } from "../environment";
import { formatDateAsHumanReadable } from "../utils/dates";
import chalk from "chalk";

export enum LogLevel {
    DEBUG,
    LOG,
    WARN,
    ERROR,
};

export class LogBuilder {
    private printable: boolean;
    private level: LogLevel;
    private date?: Date;

    constructor(private readonly content: string) {
        this.printable = true;
        this.level = LogLevel.LOG;
        this.date = undefined;
    }

    public build(): string {
        if (!this.printable) return "";

        let string = this.content;

        if (this.date) string = `${formatDateAsHumanReadable(this.date)} > ${string}`

        switch (this.level) {
        case LogLevel.DEBUG:
            string = chalk.blue(string);
            break;
        case LogLevel.LOG:
            string = chalk.white(string);
            break;
        case LogLevel.WARN:
            string = chalk.yellow(string);
            break;
        case LogLevel.ERROR:
            string = chalk.red(string);
            break;
        default:
            const _exhaustiveCheck: never = this.level;
        }

        return string;
    }

    public onlyInDevelopmentEnvironment(): this {
        if (environment.type === EnvironmentType.DEVELOPMENT) this.printable = false;
        return this;
    }

    public addDate(): this {
        this.date = new Date();
        return this;
    }

    public setLevel(level: LogLevel): this {
        this.level = level;
        return this;
    }
}
