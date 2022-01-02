import { UserInfo } from './../share/Type';
import { DocumentData } from "@firebase/firestore";
export const convert = (documentData: DocumentData) : UserInfo | null => {
    if (documentData) {
        return {
            name: documentData.name,
            email: documentData.email,
            phoneNumber: documentData.phoneNumber,
            className: documentData.className,
            studentNumber: documentData.studentNumber,
            statistic: documentData.statistic,
        }
    }

    return null;
};
