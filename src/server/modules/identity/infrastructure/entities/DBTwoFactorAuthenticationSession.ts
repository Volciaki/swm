import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity("two_factor_authentication_sessions")
export class DBTwoFactorAuthenticationSession {
    @PrimaryColumn()
        id!: string;

    @Column()
        value!: string;

    @Column({ name: "user_id" })
        userId!: string;
}
