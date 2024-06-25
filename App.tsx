import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MainStack } from "./src/navigation/main";
import { Provider } from "react-redux";
import { persistor, store } from "src/store/store";
import { PersistGate } from "redux-persist/integration/react";
const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <MainStack />
        </PersistGate>
      </Provider>
    </QueryClientProvider>
  );
}
