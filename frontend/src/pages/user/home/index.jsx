import { useState } from "react"
import AboutSection from "./AboutSection"
import ContactSection from "./ContactSection"
import FooterSection from "./FooterSection"
import HeroSection from "./HeroSection"
import Navbar from "./Navbar"
import OrderStepsSection from "./OrderStepSection"
import ProductSection from "./ProductSection"
import TestimonialSection from "./TestimonialSection"
import Cart from "./Cart"
import ConfirmDialog from "../../../components/ConfirmDialog"

function Home() {
  const [showCart, setShowCart] = useState(false)
  const [showLogoutConfirm, setShoLogoutConfirm] = useState(false)
  return (
    <>
      {/* Confirm Dialog */}
      <ConfirmDialog
        isOpen={showLogoutConfirm}
        onConfirm={() => setShoLogoutConfirm(false)}
        onCancel={() => setShoLogoutConfirm(false)}
        message="Apakah Anda yakin ingin keluar?"
      />
      <Navbar
        onCartClick={() => setShowCart(true)}
        onLogout={() => setShoLogoutConfirm(true)}
      />
      <HeroSection />
      <ProductSection />
      <AboutSection />
      <OrderStepsSection />
      <TestimonialSection />
      <ContactSection />
      {showCart && <Cart onClose={() => setShowCart(false)} />}
      <FooterSection />
    </>
  )
}

export default Home
