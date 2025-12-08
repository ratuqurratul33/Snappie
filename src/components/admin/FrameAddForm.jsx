export default function FrameAddForm({
  namaFrame, setNamaFrame,
  jenis, setJenis,
  harga, setHarga,
  lokasi, setLokasi,
  setFile,
  handleSubmit
}) {
  return (
    <form
      onSubmit={handleSubmit}
      className="
        w-full max-w-[700px]
        bg-[#FFEB91]
        border-[3px] border-black 
        rounded-2xl 
        shadow-[0_5px_0_#000]
        p-8 mb-10
        font-roboto
      "
    >
      {/* Nama Frame */}
      <label className="text-[15px] font-medium mb-1 block">
        Nama Frame
      </label>
      <input
        type="text"
        placeholder="Masukkan nama frame..."
        value={namaFrame}
        onChange={(e) => setNamaFrame(e.target.value)}
        className="
          w-full h-[45px] 
          border-[2px] border-black rounded-lg
          px-4 mb-4
          focus:outline-none focus:border-snappiePink
        "
      />

      {/* Jenis Frame */}
      <label className="text-[15px] font-medium mb-1 block">
        Jenis Frame
      </label>
      <select
        value={jenis}
        onChange={(e) => setJenis(e.target.value)}
        className="
          w-full h-[45px] 
          border-[2px] border-black rounded-lg
          px-4 mb-4 bg-white
          focus:outline-none focus:border-snappiePink
        "
      >
        <option value="gratis">Gratis</option>
        <option value="premium">Premium</option>
      </select>

      {/* Harga jika premium */}
      {jenis === "premium" && (
        <>
          <label className="text-[15px] font-medium mb-1 block">
            Harga Frame
          </label>
          <input
            type="number"
            value={harga}
            onChange={(e) => setHarga(e.target.value)}
            className="
              w-full h-[45px] 
              border-[2px] border-black rounded-lg
              px-4 mb-4 bg-white
              focus:outline-none focus:border-snappiePink
            "
            placeholder="Masukkan harga"
          />
        </>
      )}

      {/* Lokasi Foto */}
      <label className="text-[15px] font-medium mb-1 block">
        Penempatan Foto
      </label>
      <select
        value={lokasi}
        onChange={(e) => setLokasi(e.target.value)}
        className="
          w-full h-[45px] 
          border-[2px] border-black rounded-lg
          px-4 mb-4 bg-white
          focus:outline-none focus:border-snappiePink
        "
      >
        <option value="foto1">Foto 1</option>
        <option value="foto2">Foto 2</option>
      </select>

      {/* Upload Gambar */}
      <label className="text-[15px] font-medium mb-1 block">
        Upload Gambar Frame
      </label>
      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
        className="
          w-full h-[45px] 
          border-[2px] border-black rounded-lg
          px-4 mb-6 bg-white
        "
      />

      {/* Submit */}
      <button
        type="submit"
        className="
          w-full h-[50px]
          bg-snappieGreen
          border-[3px] border-black
          rounded-xl
          font-pixel text-[14px]
          hover:brightness-95 hover:scale-[0.98]
          transition-all
        "
      >
        Simpan Frame
      </button>
    </form>
  );
}
