import { ConversationContextProvider } from "../../context/conversation-context";

export default function ConversationLayout({ children }: { children: React.ReactNode }) {
    return (
        <ConversationContextProvider>
            {children}
        </ConversationContextProvider>
    );
}