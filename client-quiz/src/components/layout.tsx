export default function Layout({ children }: any) {
  return (
    <>
      <div className="flex items-center justify-center h-screen text-black">
      <div className="w-11/12 sm:w-2/3 md:w-1/2 lg:w-1/3 h-5/6 bg-white rounded-lg shadow-lg p-8">
          {children}
        </div>
      </div>
    </>
  );
}
