import { useEffect, useState } from "react"
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
import { useDispatch, useSelector } from "react-redux"
import { getProductsByUser } from "../../../store/thunk/productThunk"
import { logout } from "../../../store/thunk/authThunk"
import { getCart } from "../../../store/thunk/cartThunk"

function Home() {
  const { user } = useSelector((state) => state.auth)
  const [showCart, setShowCart] = useState(false)
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getProductsByUser())
  }, [dispatch])

  useEffect(() => {
    if (user) {
      dispatch(getCart())
    }
  }, [dispatch, user])

  const onConfirm = () => {
    dispatch(logout())
    setShowLogoutConfirm(false)
  }

  return (
    <>
      {/* Confirm Dialog */}
      <ConfirmDialog
        isOpen={showLogoutConfirm}
        onConfirm={onConfirm}
        onCancel={() => setShowLogoutConfirm(false)}
        message="Apakah Anda yakin ingin keluar?"
      />
      <Navbar
        onCartClick={() => setShowCart(true)}
        onLogout={() => setShowLogoutConfirm(true)}
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
