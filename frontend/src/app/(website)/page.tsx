import { HomeScaffold } from "@/features/home/components/home-scaffold";

export default function Page() {
  return <HomeScaffold
    title="Home"
    purpose="Solara’s entry point and feature navigation."
    todos={["Build homepage sections inside the home feature.","Replace placeholder copy with the approved content."]}
  />;
}
