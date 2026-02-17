import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { styles, toastToneStyles } from "./styles";

type ToastType = "success" | "error" | "info";

type ShowToastParams = {
  message: string;
  type?: ToastType;
  duration?: number;
};

type ToastState = {
  visible: boolean;
  message: string;
  type: ToastType;
};

type ToastContextValue = {
  showToast: (params: ShowToastParams) => void;
};

const DEFAULT_DURATION = 1800;

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const insets = useSafeAreaInsets();
  const [toast, setToast] = useState<ToastState>({
    visible: false,
    message: "",
    type: "info",
  });
  const [hideTimeoutId, setHideTimeoutId] = useState<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (hideTimeoutId) {
        clearTimeout(hideTimeoutId);
      }
    };
  }, [hideTimeoutId]);

  const showToast = useCallback((params: ShowToastParams) => {
    if (hideTimeoutId) {
      clearTimeout(hideTimeoutId);
    }

    const duration = params.duration ?? DEFAULT_DURATION;
    setToast({
      visible: true,
      message: params.message,
      type: params.type ?? "info",
    });

    const timeoutId = setTimeout(() => {
      setToast((prev) => ({ ...prev, visible: false }));
    }, duration);
    setHideTimeoutId(timeoutId);
  }, [hideTimeoutId]);

  const contextValue = useMemo(() => ({ showToast }), [showToast]);

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      {toast.visible ? (
        // 하단 안전영역을 고려해 토스트 위치를 보정한다.
        <View
          pointerEvents="none"
          style={[styles.container, { paddingBottom: Math.max(insets.bottom, 12) }]}
        >
          <View style={[styles.toastBase, toastToneStyles[toast.type]]}>
            <Text style={styles.message}>{toast.message}</Text>
          </View>
        </View>
      ) : null}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within ToastProvider");
  }
  return context;
}
