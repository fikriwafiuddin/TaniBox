import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { toast } from "react-toastify"
import { resetMessage as resetUserMessage } from "../store/slice/authSlice"
import { resetMessage as resetCartMessage } from "../store/slice/cartSlice"
import { resetMessage as resetOrderMessage } from "../store/slice/orderSlice"
import { resetMessage as resetProductMessage } from "../store/slice/productSlice"
import { resetMessage as resetAddressMessage } from "../store/slice/addressSlice"

function useToastMessages() {
  const dispatch = useDispatch()

  const { msgError: userError, msgSuccess: userSuccess } = useSelector(
    (state) => state.auth
  )

  const { msgError: cartError, msgSuccess: cartSuccess } = useSelector(
    (state) => state.cart
  )

  const { msgError: orderError, msgSuccess: orderSuccess } = useSelector(
    (state) => state.order
  )

  const { msgError: productError, msgSuccess: productSuccess } = useSelector(
    (state) => state.product
  )

  const { msgError: addressError, msgSuccess: addressSuccess } = useSelector(
    (state) => state.address
  )

  useEffect(() => {
    if (userError) {
      toast.error(userError)
      dispatch(resetUserMessage())
    } else if (userSuccess) {
      toast.success(userSuccess)
      dispatch(resetUserMessage())
    }
  }, [userError, userSuccess, dispatch])

  useEffect(() => {
    if (cartError) {
      toast.error(cartError)
      dispatch(resetCartMessage())
    } else if (cartSuccess) {
      toast.success(cartSuccess)
      dispatch(resetCartMessage())
    }
  }, [cartError, cartSuccess, dispatch])

  useEffect(() => {
    if (orderError) {
      toast.error(orderError)
      dispatch(resetOrderMessage())
    } else if (orderSuccess) {
      toast.success(orderSuccess)
      dispatch(resetOrderMessage())
    }
  }, [orderError, orderSuccess, dispatch])

  useEffect(() => {
    if (productError) {
      toast.error(productError)
      dispatch(resetProductMessage())
    } else if (productSuccess) {
      toast.success(productSuccess)
      dispatch(resetProductMessage())
    }
  }, [productError, productSuccess, dispatch])

  useEffect(() => {
    if (addressError) {
      toast.error(addressError)
      dispatch(resetAddressMessage())
    } else if (addressSuccess) {
      toast.success(addressSuccess)
      dispatch(resetAddressMessage())
    }
  }, [addressError, addressSuccess, dispatch])
}

export default useToastMessages
