import React, { createContext, useReducer, useContext, ReactNode } from 'react';
import {OrderDetails} from "../../types";

interface OrderDetailsState {
    orderDetails: OrderDetails | null;
}

type OrderDetailsAction =
    | { type: 'CLEAR' }
    | { type: 'UPDATE'; payload: OrderDetails };

const initialState: OrderDetailsState = {
    orderDetails: null,
};

function orderDetailsReducer(state: OrderDetailsState, action: OrderDetailsAction): OrderDetailsState {
    switch (action.type) {
        case 'CLEAR':
            return { orderDetails: null };
        case 'UPDATE':
            return { orderDetails: action.payload };
        default:
            return state;
    }
}

const OrderDetailsContext = createContext<{
    state: OrderDetailsState;
    dispatch: React.Dispatch<OrderDetailsAction>;
}>({
    state: initialState,
    dispatch: () => null,
});

interface OrderDetailsProviderProps {
    children: ReactNode;
}

export const OrderDetailsProvider: React.FC<OrderDetailsProviderProps> = ({ children }) => {
    const [state, dispatch] = useReducer(orderDetailsReducer, initialState);

    return (
        <OrderDetailsContext.Provider value={{ state, dispatch }}>
            {children}
        </OrderDetailsContext.Provider>
    );
};

export const useOrderDetails = () => useContext(OrderDetailsContext);
