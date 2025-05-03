import { ConversationContextProvider } from "./conversation_context";

export default function ConversationLayout({ children }: { children: React.ReactNode }) {
    return (
        <ConversationContextProvider>
            {children}
        </ConversationContextProvider>
    );
}