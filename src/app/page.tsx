import { type FC } from "react";

const Home: FC = () => (
    <div
        style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "#676767",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            gap: 10,
        }}
    >
        <img
            src={"https://files.khenzii.dev/exploding-ryo.gif"}
            alt={"Ryo"}
            style={{ maxHeight: "300px" }}
        />
        <p style={{ color: "lightblue" }}>{":3"}</p>
    </div>
);

export default Home;
