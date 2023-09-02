import { Dropzone } from "@/components/gallery/dropzone"

export default function UploadPage() {
  return (
    <section className="py-20">
      <h1 className="text-center font-serif text-7xl md:text-9xl">Upload</h1>
      <Dropzone className="mt-10 border border-neutral-200 p-16" />
    </section>
  )
}
