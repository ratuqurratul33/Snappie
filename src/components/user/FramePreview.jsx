import { getSlot } from "../../utils/frameLayout";

export default function FramePreview({ photos, selectedFrame, stripCount }) {
  const SLOT = getSlot(stripCount);

  return (
    <div
      style={{
        width: SLOT.frameWidth,
        height: SLOT.frameHeight,
        position: "relative",
        overflow: "hidden",
        backgroundColor: selectedFrame?.type === "color" ? selectedFrame.color : "#fff"
      }}
    >

      {/* FOTO STRIP */}
      {photos.slice(0, stripCount).map((photo, i) => (
        <img
          key={i}
          src={photo}
          style={{
            position: "absolute",
            left: SLOT.x,
            top: SLOT.yStart + i * (SLOT.height + SLOT.gap),
            width: SLOT.width,
            height: SLOT.height,
            objectFit: "cover"
          }}
        />
      ))}

      {/* FRAME GAMBAR OVERLAY */}
      {selectedFrame?.type === "image" &&
        selectedFrame.frameByStrip?.[stripCount] && (
          <img
            src={selectedFrame.frameByStrip[stripCount]}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              pointerEvents: "none"
            }}
          />
        )}

       {/* WATERMARK SNAPPIE */}
      {selectedFrame?.type === "color" && (
        <div
          className="font-press"
          style={{
            position: "absolute",
            bottom: 25,
            right: 25,
            color: "#FFE97F",
            fontSize: "20px",
            textShadow: "2px 2px #000"
          }}
        >
          Snappie
        </div>
      )}
      
    </div>
  );
}
