import styles from "./index.module.scss";
import { useState } from "react";

export type TwoFactorAuthenticationForm = {
    onClick: (TwoFactorAuthenticationCode: string) => void;
};

function Input2FACodeForm({onClick}: TwoFactorAuthenticationForm) {
    const [TwoFactorAuthenticationCode, setTwoFactorAuthenticationCode] = useState("");

    return(
        <div
            className={styles["div2FAStyle"]}
        >
            <input
                type="text"
                placeholder="Please type your 2FA code here"
                className={styles["form2FAStyle"]}
                value={TwoFactorAuthenticationCode}
                onChange={(e) => setTwoFactorAuthenticationCode(e.target.value)}
            />
            <button
                className={styles["button2FAStyle"]}
                onClick={() => onClick(TwoFactorAuthenticationCode)}
            >
                Submit
            </button>
        </div>
    );
}

export default Input2FACodeForm