import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./slices/usersSlice";
import userDataReducer from "./slices/userDataSlice";
import promoReducer from "./slices/promoSlice";
import storeReducer from "./slices/storeSlice";
import brandReducer from "./slices/brandSlice";
import transactionReducer from "./slices/transaction";
import tierReducer from "./slices/tierSlice";
import pointReducer from "./slices/pointSlice";
import historyTierReducer from "./slices/historyTierSlice";
import voucherReducer from "./slices/voucherSlice";
import voucherListReducer from "./slices/voucherListSlice";
import rewardsReducer from "./slices/rewardsSlice";

const store = configureStore({
  reducer: {
    users: usersReducer,
    userData: userDataReducer,
    brand: brandReducer,
    promo: promoReducer,
    store: storeReducer,
    transaction: transactionReducer,
    tier: tierReducer,
    point: pointReducer,
    tierHistory: historyTierReducer,
    voucher: voucherReducer,
    voucherList: voucherListReducer,
    rewards: rewardsReducer,
  },
  devTools: process.env.NEXT_PUBLIC_NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
