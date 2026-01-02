import { motion, AnimatePresence } from "framer-motion";
import { Check, X } from "lucide-react";
import Lottie from "lottie-react";
import proAnimation from "../../../../../../public/assets/main/animation/pro-animation.json";
import enterpriseAnimation from "../../../../../../public/assets/main/animation/enterprise-animation.json";
import { useModal, useSubscriptionsActions } from "@/hooks/useSubscriptionsState";

export const PlanModal = () => {
  const { isModalOpen, selectedModalPlan } = useModal();
  const { handleCloseModal } = useSubscriptionsActions();
  
  if (!selectedModalPlan) return null;

  return (
    <AnimatePresence>
      {isModalOpen && (
        <motion.div 
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div 
            className="bg-white rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto"
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="text-xl font-semibold text-gray-900">
                {selectedModalPlan.name} Plan Details
              </h2>
              <motion.button
                onClick={handleCloseModal}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-5 h-5 text-gray-500" />
              </motion.button>
            </div>

            <div className="p-6">
              <div className="text-center mb-6">
                <motion.div 
                  className="mb-4"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.3 }}
                >
                  <Lottie 
                    animationData={selectedModalPlan.name === "Pro" ? proAnimation : enterpriseAnimation}
                    className="w-32 h-32 mx-auto"
                    loop
                  />
                </motion.div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {selectedModalPlan.name}
                </h3>
                <div className="mb-4">
                  <span className="text-3xl font-bold text-gray-900">
                    {selectedModalPlan.price}
                  </span>
                  {selectedModalPlan.period && (
                    <span className="text-lg text-gray-500">
                      {selectedModalPlan.period}
                    </span>
                  )}
                </div>
              </div>

              <div className="mb-6">
                <motion.h4 
                  className="text-lg font-semibold text-gray-900 mb-4"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  Features included:
                </motion.h4>
                <ul className="space-y-3">
                  {selectedModalPlan.features.map((feature, index) => (
                    <motion.li 
                      key={index} 
                      className="flex items-start gap-3"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                    >
                      <Check className="w-5 h-5 mt-0.5 shrink-0 text-green-600" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              <motion.div 
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <motion.button
                  onClick={handleCloseModal}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  className="w-full px-6 py-3 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition-colors cursor-pointer mb-3"
                >
                  Coming Soon
                </motion.button>
                <motion.p 
                  className="text-xs text-gray-500"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                >
                  This feature will be available in the next update. Stay tuned!
                </motion.p>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}