"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useAppStore } from "@/lib/store"
import { useMemo } from "react"
import { Heart, Sparkles, Star } from "lucide-react"

export function ProductsScreen() {
  const { userProfile } = useAppStore()

  const recommendedProducts = useMemo(() => {
    const products = [
      {
        id: 1,
        name: "Argan Oil Hair Serum",
        category: "Serum",
        rating: 4.8,
        price: "$24.99",
        description: "Lightweight argan oil serum for shine and frizz control",
        tags: ["Frizz", "Shine", "Natural"],
      },
      {
        id: 2,
        name: "Deep Moisture Mask",
        category: "Mask",
        rating: 4.6,
        price: "$19.99",
        description: "Weekly deep conditioning treatment for dry hair",
        tags: ["Hydration", "Repair", "Weekly"],
      },
      {
        id: 3,
        name: "Silk Pillowcase",
        category: "Accessory",
        rating: 4.9,
        price: "$34.99",
        description: "Reduces friction and prevents hair breakage while sleeping",
        tags: ["Prevention", "Sleep", "Recommended"],
      },
      {
        id: 4,
        name: "UV Protective Spray",
        category: "Spray",
        rating: 4.5,
        price: "$14.99",
        description: "Shields hair from sun damage and color fading",
        tags: ["Protection", "Outdoor", "UV"],
      },
    ]
    return products
  }, [])

  return (
    <div className="space-y-6 px-4 pb-24 pt-6">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-foreground">Recommended Products</h1>
        <p className="text-muted-foreground">
          Curated for your hair type and concerns
        </p>
      </div>

      {/* DIY Alternatives */}
      <Card className="border-0 bg-gradient-to-br from-primary/10 to-primary/5 shadow-lg shadow-black/5">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <Sparkles className="h-5 w-5 text-primary mt-0.5 shrink-0" />
            <div>
              <p className="font-semibold text-sm text-foreground">Budget-Friendly Alternative</p>
              <p className="text-sm text-muted-foreground mt-1">
                Mix coconut oil with honey for a DIY deep conditioning mask. Apply for 20 minutes before shampooing!
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Products Grid */}
      <div className="space-y-3">
        {recommendedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}

function ProductCard({ product }: { product: any }) {
  return (
    <Card className="border-0 bg-card shadow-lg shadow-black/5 overflow-hidden hover:shadow-lg hover:shadow-black/10 transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div>
            <p className="font-semibold text-foreground">{product.name}</p>
            <p className="text-xs text-muted-foreground">{product.category}</p>
          </div>
          <div className="flex items-center gap-1 bg-primary/10 px-2 py-1 rounded-full">
            <Star className="h-3 w-3 text-primary fill-primary" />
            <span className="text-xs font-semibold text-primary">{product.rating}</span>
          </div>
        </div>

        <p className="text-sm text-muted-foreground mb-3">{product.description}</p>

        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-1">
            {product.tags.map((tag: string) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
          <p className="font-bold text-primary">{product.price}</p>
        </div>
      </CardContent>
    </Card>
  )
}
