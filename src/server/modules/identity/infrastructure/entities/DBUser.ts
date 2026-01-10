import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity("users")
export class DBUser {
    @PrimaryColumn()
        id!: string;

    @Column()
        email!: string;

    @Column({ name: "password_hash" })
        passwordHash!: string;

    @Column()
        name!: string;

    @Column({ name: "is_admin" })
        isAdmin!: boolean;

    @Column({ name: "two_factor_authentication_enabled" })
        twoFactorAuthenticationEnabled!: boolean;
}
