export interface SpacerProps {
  heightDesktop?: number; 
  heightMobile?: number;
}

function Spacer ({ heightDesktop = 80, heightMobile = 80 }: SpacerProps) {
  return (
    <>
      <div
        style={{
          height: `${heightDesktop}px`,
          width: "100%",
        }}
        class="max-md:hidden"
      />
      <div
        style={{
          height: `${heightMobile}px`,
          width: "100%",
        }}
        class="md:hidden"
      />
    </>
  );
}

export function LoadingFallback() {
  return (
    <div style={{ height: "716px" }} class="flex justify-center items-center">
      <span class="loading loading-spinner" />
    </div>
  );
}

export default Spacer;
