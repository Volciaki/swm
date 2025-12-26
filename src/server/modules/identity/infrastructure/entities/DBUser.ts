import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity("users")
export class DBUser {
    @PrimaryColumn()
    id!: string;

    @Column()
    email!: string;

    @Column()
    passwordHash!: string;

    @Column()
    name!: string;

    @Column()
    isAdmin!: boolean;

    @Column()
    twoFactorAuthenticationEnabled!: boolean;
}
