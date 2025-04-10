import React from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

export default function SejarahPage() {
  return (
    <div className="container mx-auto py-12 px-4 pt-24">
      <h1 className="text-4xl font-bold mb-8">Sejarah Desa Manud Jaya</h1>

      <div className="max-w-4xl mx-auto">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Asal Usul Desa</CardTitle>
          </CardHeader>
          <CardContent>
            <p
              className="text-muted-foreground mb-4"
              dangerouslySetInnerHTML={{
                __html:
                  'Desa Manud Jaya memiliki sejarah yang panjang dan kaya. Berdasarkan cerita turun-temurun, desa ini didirikan oleh sekelompok pendatang yang mencari tempat tinggal baru pada ratusan tahun yang lalu.',
              }}
            />
            <p className="text-muted-foreground">
              Nama "Manud Jaya" sendiri memiliki makna yang dalam. "Manud"
              berasal dari kata dalam bahasa lokal yang berarti "bersatu",
              sementara "Jaya" berarti "kejayaan". Nama ini mencerminkan harapan
              pendiri desa untuk menciptakan komunitas yang bersatu dan mencapai
              kejayaan bersama.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Perkembangan Desa</CardTitle>
          </CardHeader>
          <CardContent>
            <p
              className="text-muted-foreground mb-4"
              dangerouslySetInnerHTML={{
                __html:
                  'Seiring berjalannya waktu, Desa Manud Jaya mengalami berbagai perubahan dan perkembangan. Dari sebuah pemukiman kecil, desa ini tumbuh menjadi komunitas yang lebih besar dengan berbagai fasilitas dan infrastruktur yang berkembang.',
              }}
            />
            <p className="text-muted-foreground">
              Perkembangan ini tidak lepas dari kerja keras dan semangat gotong
              royong masyarakat setempat yang terus berusaha untuk meningkatkan
              kualitas hidup mereka.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Tokoh-Tokoh Penting</CardTitle>
          </CardHeader>
          <CardContent>
            <p
              className="text-muted-foreground mb-4"
              dangerouslySetInnerHTML={{
                __html:
                  'Dalam perjalanan sejarahnya, Desa Manud Jaya telah melahirkan berbagai tokoh penting yang berkontribusi besar terhadap perkembangan desa. Tokoh-tokoh ini telah meninggalkan warisan berupa nilai-nilai, kebijaksanaan, dan berbagai pencapaian yang masih diingat hingga saat ini.',
              }}
            />
            <p className="text-muted-foreground">
              Kisah-kisah tentang tokoh-tokoh ini terus diceritakan dari
              generasi ke generasi sebagai bagian dari warisan budaya dan
              sejarah desa.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Warisan Sejarah</CardTitle>
          </CardHeader>
          <CardContent>
            <p
              className="text-muted-foreground mb-4"
              dangerouslySetInnerHTML={{
                __html:
                  'Desa Manud Jaya memiliki berbagai peninggalan sejarah yang menjadi bukti perjalanan panjang desa ini. Peninggalan-peninggalan ini mencakup bangunan-bangunan tua, artefak-artefak, dan berbagai dokumen sejarah yang telah dilestarikan.',
              }}
            />
            <p className="text-muted-foreground">
              Warisan sejarah ini tidak hanya menjadi kebanggaan masyarakat
              setempat, tetapi juga menjadi daya tarik bagi pengunjung yang
              ingin mempelajari lebih lanjut tentang sejarah desa.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
