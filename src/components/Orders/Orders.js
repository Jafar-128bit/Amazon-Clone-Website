import './Orders.css';
import {useEffect, useState} from "react";
import {db} from "../../config";
import {useStateValue} from "../../Helper/StateProvider";
import Order from "../Order/Order";

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [{basket, user}, dispatch] = useStateValue();
    useEffect(() => {
        if (user) {
            db
                .collection('user')
                .doc(user?.uid)
                .collection('orders')
                .orderBy('created', 'desc')
                .onSnapshot(snapshot => {
                    //mapping through all orders and showing most recent orders
                    setOrders(snapshot.docs.map(doc => ({
                        id: doc.id,
                        data: doc.data(),
                    })));
                });
        } else {
            setOrders([]);
        }
    }, [user]);
    // console.log(orders);
    return (
        <div className="orders">
            <div className="orders__order">
                {orders?.map((value, index) => (
                    <Order key={index} value={value}/>
                ))}
            </div>
        </div>
    );
};

export default Orders;
