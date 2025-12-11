export default function FramePreview({ photos, selectedFrame, stripCount }) {
  const CM = 37.79527559;
  const CONFIG = {
    4: { width: 8.83 * CM, height: 4.79 * CM, x: 0.84 * CM, yStart: 2 * CM, gap: 0.7 * CM, frameWidth: 10.5 * CM, frameHeight: 29.7 * CM },
    3: { width: 8.83 * CM, height: 5 * CM, x: 0.85 * CM, yStart: 1.2 * CM, gap: 1.4 * CM, frameWidth: 10.5 * CM, frameHeight: 22.5 * CM },
    2: { width: 8.83 * CM, height: 9.5 * CM, x: 0.84 * CM, yStart: 4 * CM, gap: 1.5 * CM, frameWidth: 10.5 * CM, frameHeight: 29.7 * CM },
    1: { width: 12.5 * CM, height: 8.5 * CM, x: 0.8 * CM, yStart: 1 * CM, gap: 0, frameWidth: 14 * CM, frameHeight: 10.5 * CM },
  };

  const SLOT = CONFIG[stripCount];

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
