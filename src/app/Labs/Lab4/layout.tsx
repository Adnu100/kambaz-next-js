import ReduxProvider from "./redux-provider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ReduxProvider>{children}</ReduxProvider>;
}
