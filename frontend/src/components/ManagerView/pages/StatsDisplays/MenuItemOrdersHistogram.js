import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { getOrderMenuItems, getItemName, getOrders } from "../../../../network/api";

const MenuItemOrdersHistogram = ({ start_date, end_date })  => {
    const [itemLabels, setLabels] = useState([]);
    const [itemData, setData] = useState({});
    const [backgroundColors, setBackgroundColors] = useState([]);
    const [borderColors, setBorderColors] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            // const topten = await getTopTen();
            // TO DO: get order menu items from a timeline ... date -> orders.... get order ids for that timeline... get count of menu items from order_menu_items where the id is from a to b
            const orders = await getOrders(start_date, end_date);
            const order_ids = [];

            orders.forEach((order) => {
                const orderId = order[0];
                order_ids.push(orderId);
            });
            // console.log("hey");
            // console.log(order_ids);
            // const start_id = order_ids[0];
            // const finish_id = order_ids[-1];
            const menu_items = await getOrderMenuItems();
            // console.log("here");
            // console.log(all_menu_items);
            // const menu_items = [];

            // all_menu_items.forEach((item) => {
            //     if (order_ids.includes(item.menu_item_id)){
            //         menu_items.push(item);
            //     }
            // });
            // console.log(menu_items);
            const _itemLabels = [];
            const _itemData = [];
            const backgroundColors = [];
            const borderColors = [];
            // console.log(menu_items);
            const backgroundColorsBank = [
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(153, 102, 255, 0.2)",
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(153, 102, 255, 0.2)",
            ];
            const borderColorsBank = [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
            ];
            for (let i = 0; i < menu_items.length; i++) {
                const item_id = i;
                const item_name = await getItemName(item_id);
                // console.log(item_name.item_name);
                _itemLabels.push(item_name.item_name);
                _itemData.push(menu_items[i]["category_count"]);
                backgroundColors.push(backgroundColorsBank[(i%10)]);
                borderColors.push(borderColorsBank[(i%10)]);
            }

            setLabels(_itemLabels);
            setData(_itemData);
            setBackgroundColors(backgroundColors);
            setBorderColors(borderColors);
        };

        fetchData();
    }, []);

    const data = {
        labels: itemLabels,
        datasets: [
            {
                label: "Number of Orders",
                data: itemData,
                backgroundColor: backgroundColors,
                borderColor: borderColors,
                borderWidth: 1,
            },
        ],
    };

    return (
        <div>
            <h2>Menu Item Orders Histogram</h2>
            {itemLabels.length > 0 && (
                <Bar data={data} />
            )}
        </div>
    );
    
};

export default MenuItemOrdersHistogram;
