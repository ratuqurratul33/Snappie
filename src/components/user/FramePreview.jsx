export default function FramePreview({ photos, selectedFrame, stripCount }) {
  const CM = 37.79527559;
  const CONFIG = {
    4: { width: 8.83*CM, height:4.79*CM, x:0.84*CM, yStart:2*CM, gap:0.7*CM, frameWidth:10.5*CM, frameHeight:29.7*CM },
    3: { width:8.83*CM, height:5*CM, x:0.85*CM, yStart:1.2*CM, gap:1.4*CM, frameWidth:10.5*CM, frameHeight:22.5*CM },
    2: { width:8.83*CM, height:9.5*CM, x:0.84*CM, yStart:4*CM, gap:1.5*CM, frameWidth:10.5*CM, frameHeight:29.7*CM },
    1: { width:12.5*CM, height:8.5*CM, x:0.8*CM, yStart:1*CM, gap:0, frameWidth:14*CM, frameHeight:10.5*CM },
  };
  const SLOT = CONFIG[stripCount];

  // cek paid
  const isPaid = selectedFrame?.thumb && !selectedFrame.thumb.toLowerCase().includes("free");

  return (
    <div style={{ width:SLOT.frameWidth, height:SLOT.frameHeight, position:"relative", backgroundColor:selectedFrame?.type==="color"?selectedFrame.value:"#fff" }}>
      {photos.slice(0, stripCount).map((photo,i)=>(
        <img key={i} src={photo} style={{
          position:"absolute",
          left:SLOT.x, top:SLOT.yStart + i*(SLOT.height+SLOT.gap),
          width:SLOT.width, height:SLOT.height,
          objectFit:"cover"
        }} />
      ))}

      {selectedFrame?.type==="image" && selectedFrame.value[stripCount] && (
        <img src={selectedFrame.value[stripCount]} style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover", pointerEvents:"none" }} />
      )}

      {isPaid && (
        <div style={{ position:"absolute", inset:0, backgroundColor:"rgba(255,255,255,0.3)", display:"flex", alignItems:"center", justifyContent:"center", pointerEvents:"none" }}>
          <img src="/webImage/Premium.png" alt="Paid" style={{ maxWidth:"50%", maxHeight:"50%", opacity:0.8 }} />
        </div>
      )}
    </div>
  );
}
