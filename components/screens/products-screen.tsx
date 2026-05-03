"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useAppStore } from "@/lib/store"
import { useMemo } from "react"
import { ExternalLink, Heart, Sparkles, Star } from "lucide-react"

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
  // Shampoos
  { id: 'sh1', name: 'Gentle Cleansing Shampoo', category: 'Shampoo', reason: 'Sulfate-free formula for gentle cleansing', price: '$12', rating: 4.5, bestFor: ['dry', 'damaged'], emoji: '🧴' },
  { id: 'sh2', name: 'Clarifying Shampoo', category: 'Shampoo', reason: 'Removes buildup and excess oil', price: '$14', rating: 4.3, bestFor: ['oily'], emoji: '🧴' },
  { id: 'sh3', name: 'Anti-Dandruff Shampoo', category: 'Shampoo', reason: 'Contains zinc pyrithione for flake control', price: '$15', rating: 4.4, bestFor: ['dandruff'], emoji: '🧴' },
  { id: 'sh4', name: 'Curl Definition Shampoo', category: 'Shampoo', reason: 'Enhances natural curl pattern', price: '$16', rating: 4.6, bestFor: ['curly', 'coily'], emoji: '🧴' },
  
  // Oils
  { id: 'oil1', name: 'Coconut Hair Oil', category: 'Hair Oil', reason: 'Deep nourishment and shine', price: '$10', rating: 4.7, bestFor: ['dry', 'damaged', 'frizz'], emoji: '🥥' },
  { id: 'oil2', name: 'Argan Oil Treatment', category: 'Hair Oil', reason: 'Lightweight moisture without greasy feel', price: '$18', rating: 4.8, bestFor: ['frizz', 'normal'], emoji: '✨' },
  { id: 'oil3', name: 'Rosemary Growth Oil', category: 'Hair Oil', reason: 'Stimulates scalp and promotes growth', price: '$14', rating: 4.5, bestFor: ['hairfall', 'thinning'], emoji: '🌿' },
  { id: 'oil4', name: 'Tea Tree Scalp Oil', category: 'Hair Oil', reason: 'Soothes itchy scalp and fights dandruff', price: '$12', rating: 4.4, bestFor: ['itchy', 'dandruff'], emoji: '🍃' },
  
  // Serums
  { id: 'ser1', name: 'Anti-Frizz Serum', category: 'Serum', reason: 'Smooths cuticles and tames flyaways', price: '$20', rating: 4.6, bestFor: ['frizz', 'curly', 'wavy'], emoji: '💧' },
  { id: 'ser2', name: 'Split End Repair Serum', category: 'Serum', reason: 'Bonds and repairs damaged ends', price: '$22', rating: 4.5, bestFor: ['splitends', 'damaged'], emoji: '🔧' },
  { id: 'ser3', name: 'Hair Growth Serum', category: 'Serum', reason: 'Peptides and biotin for thickness', price: '$28', rating: 4.4, bestFor: ['thinning', 'hairfall'], emoji: '📈' },
  
  // Conditioners & Masks
  { id: 'con1', name: 'Deep Conditioning Mask', category: 'Mask', reason: 'Intensive weekly treatment for dry hair', price: '$16', rating: 4.7, bestFor: ['dry', 'damaged'], emoji: '🎭' },
  { id: 'con2', name: 'Protein Treatment Mask', category: 'Mask', reason: 'Strengthens weak, breaking hair', price: '$18', rating: 4.5, bestFor: ['damaged', 'hairfall'], emoji: '💪' },
  { id: 'con3', name: 'Leave-in Conditioner', category: 'Conditioner', reason: 'Daily moisture and detangling', price: '$14', rating: 4.6, bestFor: ['curly', 'coily', 'dry'], emoji: '🌸' },
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
    
    // Score products based on how many user needs they match
    const scored = allProducts.map(product => {
      const score = product.bestFor.filter(need => userNeeds.includes(need)).length
      return { ...product, score }
    })
    
    // Sort by score and return top 5
    return scored
      .sort((a, b) => b.score - a.score)
      .slice(0, 5)
  }, [userProfile])
  
  const categories = useMemo(() => {
    const cats: Record<string, typeof recommendedProducts> = {}
    recommendedProducts.forEach(product => {
      if (!cats[product.category]) cats[product.category] = []
      cats[product.category].push(product)
    })
    return cats
  }, [recommendedProducts])
  
  return (
    <div className="space-y-6 px-4 pb-24 pt-6">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-foreground">Product Picks</h1>
        <p className="text-muted-foreground">
          Curated recommendations for your hair type
        </p>
      </div>
      
      {/* AI Badge */}
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
      
      {/* Products by Category */}
      {Object.entries(categories).map(([category, products]) => (
        <div key={category} className="space-y-3">
          <h2 className="font-semibold text-foreground">{category}</h2>
          <div className="space-y-3">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      ))}
      
      {/* Budget Tip */}
      <Card className="border-0 bg-accent/20 shadow-lg shadow-black/5">
        <CardContent className="p-4">
          <h3 className="mb-2 font-semibold text-foreground">💰 Budget Tip</h3>
          <p className="text-sm text-muted-foreground">
            You don&apos;t need all products at once! Start with a good shampoo and oil, 
            then add others as needed. Quality over quantity always wins.
          </p>
        </CardContent>
      </Card>
      
      {/* DIY Section */}
      <Card className="border-0 bg-card shadow-lg shadow-black/5">
        <CardContent className="p-4">
          <h3 className="mb-3 font-semibold text-foreground">🏠 DIY Alternatives</h3>
          <div className="space-y-3">
            <DIYItem 
              title="Banana Hair Mask"
              description="Mash 1 banana + 2 tbsp honey + 1 tbsp olive oil. Apply for 20 min."
              goodFor="Dry, damaged hair"
            />
            <DIYItem 
              title="Apple Cider Vinegar Rinse"
              description="Mix 1 part ACV with 3 parts water. Use after shampooing."
              goodFor="Oily scalp, buildup"
            />
            <DIYItem 
              title="Egg Protein Treatment"
              description="Beat 1 egg + 1 tbsp coconut oil. Apply to damp hair for 20 min."
              goodFor="Weak, breaking hair"
            />
          </div>
        </CardContent>
      </Card>
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

function DIYItem({ title, description, goodFor }: { title: string; description: string; goodFor: string }) {
  return (
    <div className="rounded-xl bg-secondary/50 p-3">
      <h4 className="mb-1 font-medium text-foreground">{title}</h4>
      <p className="mb-1 text-sm text-muted-foreground">{description}</p>
      <p className="text-xs text-primary">Good for: {goodFor}</p>
    </div>
  )
}
