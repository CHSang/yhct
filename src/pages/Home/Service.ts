import { message } from "antd";

export const buildNotificatioMessage = (content : string) => {
    return  message.success({
        content,
        duration: 1,
        style: {
          fontWeight: "bold",
          color: "green",
        },
      });
}