import React from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

export default function BudayaPage() {
  return (
    <div className="container mx-auto py-12 px-4 pt-24">
      <h1 className="text-4xl font-bold mb-8">Budaya Desa Manud Jaya</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Tradisi dan Adat Istiadat</CardTitle>
          </CardHeader>
          <CardContent>
            <p
              className="text-muted-foreground mb-4"
              dangerouslySetInnerHTML={{
                __html:
                  'Desa Manud Jaya memiliki berbagai tradisi dan adat istiadat yang telah diwariskan dari generasi ke generasi. Tradisi-tradisi ini mencerminkan nilai-nilai budaya dan kearifan lokal masyarakat setempat.',
              }}
            />
            <p className="text-muted-foreground">
              Beberapa tradisi yang masih dilestarikan hingga saat ini termasuk
              upacara adat, ritual keagamaan, dan berbagai perayaan yang menjadi
              bagian integral dari kehidupan masyarakat.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Kesenian dan Kerajinan</CardTitle>
          </CardHeader>
          <CardContent>
            <p
              className="text-muted-foreground mb-4"
              dangerouslySetInnerHTML={{
                __html:
                  'Kesenian dan kerajinan tradisional merupakan bagian penting dari budaya Desa Manud Jaya. Masyarakat setempat memiliki berbagai bentuk ekspresi seni yang unik dan khas.',
              }}
            />
            <p className="text-muted-foreground">
              Kerajinan tangan, tarian tradisional, musik daerah, dan berbagai
              bentuk seni lainnya terus dikembangkan dan dilestarikan oleh
              masyarakat setempat.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Kuliner Tradisional</CardTitle>
          </CardHeader>
          <CardContent>
            <p
              className="text-muted-foreground mb-4"
              dangerouslySetInnerHTML={{
                __html:
                  'Kuliner tradisional Desa Manud Jaya memiliki cita rasa yang khas dan unik. Berbagai hidangan tradisional telah menjadi bagian dari warisan budaya setempat.',
              }}
            />
            <p className="text-muted-foreground">
              Makanan dan minuman tradisional tidak hanya menjadi sumber
              nutrisi, tetapi juga menjadi sarana untuk mempererat hubungan
              sosial dan melestarikan budaya.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Festival dan Perayaan</CardTitle>
          </CardHeader>
          <CardContent>
            <p
              className="text-muted-foreground mb-4"
              dangerouslySetInnerHTML={{
                __html:
                  'Berbagai festival dan perayaan menjadi bagian penting dari kehidupan budaya Desa Manud Jaya. Acara-acara ini menjadi momen untuk berkumpul, merayakan, dan mempererat hubungan antar warga.',
              }}
            />
            <p className="text-muted-foreground">
              Festival-festival ini juga menjadi daya tarik wisata yang dapat
              dinikmati oleh pengunjung dari berbagai daerah.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
