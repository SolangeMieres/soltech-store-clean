{fee != null && !error && (
  <p className="text-sm text-neutral-300 mt-2">
    Envío estimado:
    <span className="font-semibold text-white"> ${fee.toLocaleString("es-AR")}</span>
  </p>
)}
