import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  CreditCard, 
  Lock, 
  Shield, 
  CheckCircle, 
  AlertCircle,
  Loader2,
  Apple,
  Smartphone
} from 'lucide-react';
import { useCart } from '../../hooks/useCart';
import { stripeService, PaymentMethod } from '../../services/stripe';
import { useToast } from '../../hooks/useToast';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose }) => {
  const { items, getTotalPrice, clearCart } = useCart();
  const { success, error } = useToast();
  const [step, setStep] = useState<'review' | 'payment' | 'processing' | 'success'>('review');
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');

  const totalAmount = getTotalPrice();
  const tax = totalAmount * 0.08; // 8% tax
  const shipping = totalAmount > 50 ? 0 : 9.99;
  const finalTotal = totalAmount + tax + shipping;

  useEffect(() => {
    if (isOpen) {
      loadPaymentMethods();
    }
  }, [isOpen]);

  const loadPaymentMethods = async () => {
    try {
      const methods = await stripeService.getPaymentMethods();
      setPaymentMethods(methods);
      if (methods.length > 0) {
        setSelectedPaymentMethod(methods[0].id);
      }
    } catch (err) {
      error('Failed to load payment methods', 'Please try again later.');
    }
  };

  const handlePayment = async () => {
    if (!selectedPaymentMethod) {
      error('Payment method required', 'Please select a payment method.');
      return;
    }

    setIsLoading(true);
    setStep('processing');

    try {
      // Create payment intent
      const paymentIntent = await stripeService.createPaymentIntent(finalTotal);
      
      // Confirm payment
      const confirmedPayment = await stripeService.confirmPayment(
        paymentIntent.id,
        selectedPaymentMethod
      );

      if (confirmedPayment.status === 'succeeded') {
        setOrderNumber(`SQ-${Date.now()}`);
        setStep('success');
        clearCart();
        success('Payment successful!', 'Your order has been placed.');
      } else {
        throw new Error('Payment failed');
      }
    } catch (err) {
      error('Payment failed', 'Please check your payment details and try again.');
      setStep('payment');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    if (step !== 'processing') {
      setStep('review');
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />
          
          {/* Modal */}
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative w-full max-w-2xl bg-dark-800/95 backdrop-blur-xl border border-white/10 rounded-3xl shadow-premium overflow-hidden"
              >
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-white/10">
                  <div>
                    <h3 className="text-xl font-bold text-white">
                      {step === 'review' && 'Review Order'}
                      {step === 'payment' && 'Payment Details'}
                      {step === 'processing' && 'Processing Payment'}
                      {step === 'success' && 'Order Confirmed'}
                    </h3>
                    <p className="text-sm text-gray-400">
                      {step === 'review' && 'Review your items before checkout'}
                      {step === 'payment' && 'Secure payment powered by Stripe'}
                      {step === 'processing' && 'Please wait while we process your payment'}
                      {step === 'success' && 'Thank you for your purchase!'}
                    </p>
                  </div>
                  {step !== 'processing' && (
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={handleClose}
                      className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-200"
                    >
                      <X className="w-5 h-5" />
                    </motion.button>
                  )}
                </div>

                <div className="p-6">
                  {/* Review Step */}
                  {step === 'review' && (
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-6"
                    >
                      {/* Order Items */}
                      <div className="space-y-4">
                        <h4 className="text-lg font-semibold text-white">Order Items</h4>
                        {items.map((item) => (
                          <div key={item.id} className="flex items-center space-x-4 p-4 bg-dark-700/50 rounded-xl">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-16 h-16 rounded-lg object-cover"
                            />
                            <div className="flex-1">
                              <h5 className="text-white font-medium">{item.name}</h5>
                              <p className="text-gray-400 text-sm">Quantity: {item.quantity}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-white font-bold">${(item.price * item.quantity).toFixed(2)}</p>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Order Summary */}
                      <div className="bg-dark-700/30 rounded-xl p-4 space-y-3">
                        <div className="flex justify-between text-gray-300">
                          <span>Subtotal</span>
                          <span>${totalAmount.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-gray-300">
                          <span>Tax</span>
                          <span>${tax.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-gray-300">
                          <span>Shipping</span>
                          <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                        </div>
                        <div className="border-t border-white/10 pt-3">
                          <div className="flex justify-between text-white font-bold text-lg">
                            <span>Total</span>
                            <span>${finalTotal.toFixed(2)}</span>
                          </div>
                        </div>
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setStep('payment')}
                        className="w-full py-3 bg-gradient-to-r from-brand-500 to-brand-600 text-white font-bold rounded-xl hover:from-brand-600 hover:to-brand-700 transition-all duration-300 shadow-glow"
                      >
                        Proceed to Payment
                      </motion.button>
                    </motion.div>
                  )}

                  {/* Payment Step */}
                  {step === 'payment' && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-6"
                    >
                      {/* Payment Methods */}
                      <div>
                        <h4 className="text-lg font-semibold text-white mb-4">Payment Method</h4>
                        <div className="space-y-3">
                          {paymentMethods.map((method) => (
                            <motion.div
                              key={method.id}
                              whileHover={{ scale: 1.02 }}
                              onClick={() => setSelectedPaymentMethod(method.id)}
                              className={`p-4 border rounded-xl cursor-pointer transition-all duration-200 ${
                                selectedPaymentMethod === method.id
                                  ? 'border-brand-500 bg-brand-500/10'
                                  : 'border-white/10 bg-dark-700/30 hover:border-white/20'
                              }`}
                            >
                              <div className="flex items-center space-x-3">
                                <div className="p-2 bg-dark-600 rounded-lg">
                                  {method.type === 'card' && <CreditCard className="w-5 h-5 text-brand-400" />}
                                  {method.type === 'apple_pay' && <Apple className="w-5 h-5 text-brand-400" />}
                                  {method.type === 'google_pay' && <Smartphone className="w-5 h-5 text-brand-400" />}
                                </div>
                                <div className="flex-1">
                                  <p className="text-white font-medium">
                                    {method.type === 'card' && method.card && 
                                      `${method.card.brand.toUpperCase()} •••• ${method.card.last4}`
                                    }
                                    {method.type === 'apple_pay' && 'Apple Pay'}
                                    {method.type === 'google_pay' && 'Google Pay'}
                                  </p>
                                  <p className="text-gray-400 text-sm">{method.billing_details.name}</p>
                                </div>
                                {selectedPaymentMethod === method.id && (
                                  <CheckCircle className="w-5 h-5 text-brand-400" />
                                )}
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      {/* Security Notice */}
                      <div className="flex items-center space-x-3 p-4 bg-success-500/10 border border-success-500/30 rounded-xl">
                        <Shield className="w-5 h-5 text-success-400" />
                        <div>
                          <p className="text-success-400 font-medium">Secure Payment</p>
                          <p className="text-gray-400 text-sm">Your payment information is encrypted and secure</p>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex space-x-3">
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setStep('review')}
                          className="flex-1 py-3 bg-dark-700 text-white font-semibold rounded-xl hover:bg-dark-600 transition-colors"
                        >
                          Back
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={handlePayment}
                          disabled={!selectedPaymentMethod || isLoading}
                          className="flex-1 py-3 bg-gradient-to-r from-brand-500 to-brand-600 text-white font-bold rounded-xl hover:from-brand-600 hover:to-brand-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-glow"
                        >
                          <div className="flex items-center justify-center space-x-2">
                            <Lock className="w-4 h-4" />
                            <span>Pay ${finalTotal.toFixed(2)}</span>
                          </div>
                        </motion.button>
                      </div>
                    </motion.div>
                  )}

                  {/* Processing Step */}
                  {step === 'processing' && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-12"
                    >
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        className="w-16 h-16 mx-auto mb-6"
                      >
                        <Loader2 className="w-full h-full text-brand-400" />
                      </motion.div>
                      <h4 className="text-xl font-bold text-white mb-2">Processing Payment</h4>
                      <p className="text-gray-400">Please don't close this window...</p>
                    </motion.div>
                  )}

                  {/* Success Step */}
                  {step === 'success' && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-12"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", bounce: 0.5 }}
                        className="w-16 h-16 mx-auto mb-6 bg-success-500 rounded-full flex items-center justify-center"
                      >
                        <CheckCircle className="w-8 h-8 text-white" />
                      </motion.div>
                      <h4 className="text-xl font-bold text-white mb-2">Payment Successful!</h4>
                      <p className="text-gray-400 mb-4">Your order has been confirmed</p>
                      <div className="bg-dark-700/30 rounded-xl p-4 mb-6">
                        <p className="text-sm text-gray-400">Order Number</p>
                        <p className="text-lg font-bold text-white">{orderNumber}</p>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleClose}
                        className="w-full py-3 bg-gradient-to-r from-brand-500 to-brand-600 text-white font-bold rounded-xl hover:from-brand-600 hover:to-brand-700 transition-all duration-300 shadow-glow"
                      >
                        Continue Shopping
                      </motion.button>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CheckoutModal;