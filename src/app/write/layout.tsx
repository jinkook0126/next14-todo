type Props = {
  children: React.ReactNode;
};
export default function WriteLayout({ children }: Props) {
  return (
    <div>
      <h1> write layout</h1>
      {children}
    </div>
  );
}
