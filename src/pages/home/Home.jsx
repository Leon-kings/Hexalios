import React from 'react'
import { Hero } from '../../components/hero/Hero'
import { MensLatest } from '../latest/mens/MenLetest'
import { WomensLatest } from '../latest/womens/WomenLatest'
import { KidsLatest } from '../latest/kids/KidsLetest'
import { ProductsPage } from '../products/Products'
import { ExploreSection } from '../explore/Explore'
import { SocialMediaSection } from '../../components/social/SocialMedia'
import { SubscribeSection } from '../subscription/Subscription'

export default function Home() {
  return (
    <>
      <div className="w-full">
        <Hero/>
        <MensLatest/>
        <WomensLatest/>
        <KidsLatest/>
        <ProductsPage/>
        <ExploreSection/>
        <SocialMediaSection/>
        <SubscribeSection/>
      </div>
    </>
  )
}
