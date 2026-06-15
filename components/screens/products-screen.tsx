"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useAppStore } from "@/lib/store"
import { useMemo } from "react"
import { Heart, Sparkles, Star } from "lucide-react"

interface Product {
  id: string
  name: string
  category: string
  reason: string
  price: string
  rating: number
  bestFor: string[]
  emoji: string
}

const allProducts: Product[] = [
  { id: 'sh1', name: 'Gentle Cleansing Shampoo', category: 'Shampoo', reason: 'Sulfate-free formula for gentle cleansing', price: '$12', rating: 4.5, bestFor: ['dry', 'damaged'], emoji: '🧴' },
  { id: 'sh2', name: 'Clarifying Shampoo', category: 'Shampoo', reason: 'Removes buildup and excess oil', price: '$14', rating: 4.3, bestFor: ['oily'], emoji: '🧴' },
  { id: 'oil1', name: 'Coconut Hair Oil', category: 'Hair Oil', reason: 'Deep nourishment and shine', price: '$10', rating: 4.7, bestFor: ['dry', 'damaged', 'frizz'], emoji: '🥥' },
  { id: 'oil2', name: 'Argan Oil Treatment', category: 'Hair Oil', reason: 'Lightweight moisture without greasy feel', price: '$18', rating: 4.8, bestFor: ['frizz', 'normal'], emoji: '✨' },
  { id: 'ser1', name: 'Anti-Frizz Serum', category: 'Serum', reason: 'Smooths cuticles and tames flyaways', price: '$20', rating: 4.6, bestFor: ['frizz', 'curly', 'wavy'], emoji: '💧' },
]

export function ProductsScreen() {
  const { userProfile } = useAppStore()
  
  const recommendedProducts = useMemo(() => {
    const userNeeds = [
      userProfile.hairCondition,
      userProfile.scalpCondition,
      userProfile.hairType,
      ...userProfile.concerns
    ].filter(Boolean) as string[]
    
    const scored = allProducts.map(product => {
      const score = product.bestFor.filter(need => userNeeds.includes(need)).length
      return { ...product, score }
    })
    
    return scored.sort((a, b) => b.score - a.score).slice(0, 5)
  }, [userProfile])
  
  return (
    <div className="space-y-6 px-4 pb-24 pt-6">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold text-foreground">Product Picks</h1>
          <p className="text-muted-foreground">
            Curated recommendations for your hair type
          </p>
        </div>
        
        <Card className="border-0 bg-primary/5 shadow-lg shadow-black/5">
          <CardContent className="flex items-center gap-3 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
              <Sparkles className="h-5 w-5 text-primary" />
            </div>
            <p className="text-sm text-foreground">
              Based on your <span className="font-semibold">{userProfile.hairType}</span> hair and <span className="font-semibold">{userProfile.hairCondition}</span> condition
            </p>
          </CardContent>
        </Card>
        
        <div className="space-y-3">
          {recommendedProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  )
}

function ProductCard({ product }: { product: Product & { score: number } }) {
  return (
    <Card className="border-0 bg-card shadow-lg shadow-black/5 transition-all hover:shadow-xl">
      <CardContent className="p-4">
        <div className="flex gap-4">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-secondary text-3xl">
            {product.emoji}
          </div>
          <div className="flex-1">
            <div className="mb-1 flex items-start justify-between">
              <h3 className="font-semibold text-foreground">{product.name}</h3>
              <span className="text-sm font-semibold text-primary">{product.price}</span>
            </div>
            <p className="mb-2 text-sm text-muted-foreground">{product.reason}</p>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                <span className="text-xs font-medium text-foreground">{product.rating}</span>
              </div>
              {product.score >= 2 && (
                <Badge variant="secondary" className="gap-1 text-xs">
                  <Heart className="h-3 w-3 fill-primary text-primary" />
                  Great match
                </Badge>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
