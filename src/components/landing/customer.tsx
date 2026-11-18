"use client";

import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Star, Quote, CheckCircle2, Heart } from "lucide-react";

interface Review {
  id: number;
  name: string;
  location: string;
  image: string;
  rating: number;
  product: string;
  title: string;
  comment: string;
  date: string;
}

const reviews: Review[] = [
  {
    id: 1,
    name: "Sadia Rahman",
    location: "Gulshan, Dhaka",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop",
    rating: 5,
    product: "Traditional Garlic Relish",
    title: "Pure nostalgic taste!",
    comment:
      "Takes me straight back to my grandmother's handcrafted recipes. The aroma of pure cold-pressed mustard oil and rich spices is simply unmatched. You can taste the authenticity in every spoonful!",
    date: "Verified Buyer • 3 days ago",
  },
  {
    id: 2,
    name: "Tanjim Ahmed",
    location: "Dhanmondi, Dhaka",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop",
    rating: 5,
    product: "Handcrafted Mango Pickle",
    title: "Best relish I have tasted in years",
    comment:
      "Most commercial brands taste like artificial vinegar, but Shahiana is genuine heritage craft. The texture, spice balance, and sun-cured richness are absolutely top notch.",
    date: "Verified Buyer • 1 week ago",
  },
  {
    id: 3,
    name: "Dr. Farhana Karim",
    location: "Uttara, Dhaka",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop",
    rating: 5,
    product: "Artisanal Olive Preserve",
    title: "100% natural and clean ingredients",
    comment:
      "As someone who is very conscious about food additives, I appreciate their commitment to zero artificial preservatives. It arrived fresh, beautifully packaged, and tasted extraordinary.",
    date: "Verified Buyer • 2 weeks ago",
  },
  {
    id: 4,
    name: "Zubair Hossain",
    location: "Chittagong",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop",
    rating: 5,
    product: "Smoked Chili Delight",
    title: "A staple at our dining table now",
    comment:
      "We ordered one jar to try with khichuri, and within 3 days my entire family finished it! We just placed a bulk order for 4 more jars. Truly addicted to the warmth and depth of flavor.",
    date: "Verified Buyer • 5 days ago",
  },
  {
    id: 5,
    name: "Nusrat Jahan",
    location: "Banani, Dhaka",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop",
    rating: 5,
    product: "Heritage Spiced Lemon",
    title: "Remarkable tang and flavor depth",
    comment:
      "The sour-savory punch is exquisite! It elevates simple rice and dal into a royal feast. The premium glass jar packaging also makes it a delightful gift for friends.",
    date: "Verified Buyer • 4 days ago",
  },
  {
    id: 6,
    name: "Mahir Faysal",
    location: "Sylhet",
    image: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=400&auto=format&fit=crop",
    rating: 5,
    product: "Gourmet Mustard Relish",
    title: "Authentic Bengal heritage in a jar",
    comment:
      "Shahiana captured the true traditional flavor profile. Prompt delivery, elegant sealing, and mouth-watering taste. Will definitely keep reordering!",
    date: "Verified Buyer • 1 week ago",
  },
];

export function Customer() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -360, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      if (scrollLeft + clientWidth >= scrollWidth - 20) {
        scrollContainerRef.current.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        scrollContainerRef.current.scrollBy({ left: 360, behavior: "smooth" });
      }
    }
  };

  // Track active slide on scroll
  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft } = scrollContainerRef.current;
    const itemWidth = 360;
    const newIndex = Math.min(
      Math.round(scrollLeft / itemWidth),
      reviews.length - 1
    );
    setActiveIndex(Math.max(0, newIndex));
  };

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      scrollRight();
    }, 4000);
    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <section className="w-full bg-gradient-to-b from-[#FDFBF7] to-white py-20 px-4 sm:px-6 lg:px-8 border-t border-emerald-950/5">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#760604]/5 border border-[#760604]/10 text-[#760604] text-xs font-bold uppercase tracking-widest mb-3">
            <Star className="w-3.5 h-3.5 fill-[#E69A06] text-[#E69A06]" />
            <span>Customer Stories &amp; Reviews</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#590403] tracking-tight uppercase mb-4">
            Loved By Food Lovers
          </h2>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
            Real feedback from connoisseurs who cherish authentic, heritage-rooted recipes
            and handcrafted quality. Taste the tradition in every jar.
          </p>
        </div>

        {/* Carousel Container */}
        <div 
          className="relative group"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Left Arrow Button */}
          <button
            onClick={scrollLeft}
            aria-label="Previous review"
            className="absolute -left-3 sm:-left-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 bg-white text-[#760604] hover:bg-[#760604] hover:text-white border border-emerald-900/15 rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-105 opacity-90 sm:opacity-0 group-hover:opacity-100"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Reviews Scrollable Row */}
          <div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="flex overflow-x-auto snap-x snap-mandatory gap-5 sm:gap-6 pb-6 pt-2 hide-scrollbar scroll-smooth"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {reviews.map((review) => (
              <div
                key={review.id}
                className="w-[300px] sm:w-[360px] flex-shrink-0 snap-start bg-white rounded-2xl p-6 sm:p-7 border border-[#760604]/10 shadow-[0_4px_20px_rgba(118,6,4,0.04)] hover:shadow-[0_12px_32px_rgba(118,6,4,0.12)] hover:border-[#760604]/30 transition-all duration-300 flex flex-col justify-between group/card hover:-translate-y-1"
              >
                <div>
                  {/* Card Header: Stars & Quote Icon */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-[#E69A06] text-[#E69A06]" />
                      ))}
                    </div>
                    <div className="w-8 h-8 rounded-full bg-[#760604]/5 flex items-center justify-center text-[#760604]/40 group-hover/card:text-[#760604] transition-colors">
                      <Quote className="w-4 h-4 fill-current" />
                    </div>
                  </div>

                  {/* Product Tag */}
                  <div className="mb-3">
                    <span className="inline-block text-[11px] font-bold uppercase tracking-wider bg-[#760604]/5 text-[#760604] border border-[#760604]/10 px-2.5 py-0.5 rounded-md">
                      {review.product}
                    </span>
                  </div>

                  {/* Review Title */}
                  <h3 className="text-base sm:text-lg font-bold text-[#590403] mb-2 leading-snug">
                    "{review.title}"
                  </h3>

                  {/* Review Text */}
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal mb-6">
                    {review.comment}
                  </p>
                </div>

                {/* Reviewer Profile */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-auto">
                  <div className="flex items-center gap-3">
                    <div className="relative w-11 h-11 rounded-full overflow-hidden border-2 border-[#760604]/20 shadow-sm flex-shrink-0">
                      <Image
                        src={review.image}
                        alt={review.name}
                        fill
                        className="object-cover"
                        sizes="44px"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <p className="text-sm font-bold text-slate-900 leading-tight">
                          {review.name}
                        </p>
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#760604] fill-[#760604]/20" />
                      </div>
                      <p className="text-[11px] font-medium text-slate-500 leading-tight mt-0.5">
                        {review.location}
                      </p>
                    </div>
                  </div>

                  <span className="text-[10px] font-semibold text-[#760604] bg-[#760604]/10 px-2 py-0.5 rounded text-right whitespace-nowrap">
                    Verified
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Right Arrow Button */}
          <button
            onClick={scrollRight}
            aria-label="Next review"
            className="absolute -right-3 sm:-right-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 bg-white text-[#760604] hover:bg-[#760604] hover:text-white border border-emerald-900/15 rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-105 opacity-90 sm:opacity-0 group-hover:opacity-100"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Carousel Dots & Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 px-2">
          <div className="flex items-center gap-2">
            {reviews.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  if (scrollContainerRef.current) {
                    scrollContainerRef.current.scrollTo({
                      left: idx * 360,
                      behavior: "smooth",
                    });
                  }
                }}
                aria-label={`Go to review ${idx + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  idx === activeIndex
                    ? "bg-[#760604] w-7"
                    : "bg-slate-300 hover:bg-slate-400 w-2"
                }`}
              />
            ))}
          </div>

          <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
            <Heart className="w-3.5 h-3.5 text-[#E69A06] fill-[#E69A06]" />
            <span>Handmade with love &amp; certified culinary quality</span>
          </div>
        </div>
      </div>
    </section>
  );
}
