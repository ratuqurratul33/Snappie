import FrameList from "./FrameList";

export default function FramePremium({ frames }) {
  const premiumFrames = frames.filter(f => f.jenis === "premium");
  return <FrameList frames={premiumFrames} />;
}
