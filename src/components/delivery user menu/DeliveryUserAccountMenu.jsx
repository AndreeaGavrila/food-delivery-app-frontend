import { useEffect, useCallback, useContext } from "react"
import { useState } from "react"
import { Fragment } from "react"
import { Col, Container, Row, ListGroup } from "react-bootstrap"
import UserContext from "../context/UserContext"
import Order from "../Order"
import DeliverAccountInfo from "./DeliverAccountInfo"
import DeliverCurrentOrder from "./DeliverCurrentOrder"
import DeliveredOrders from "./DeliveredOrders"
import DeliverNavbar from "./DeliverNavbar"
import NewReceivedOrders from "./NewReceivedOrders"


const DeliveryUserAccountMenu = () => {

    const listItems = ["account info", "new orders", "current order", "delivered orders"]
    const [listItemActive, setListItemActive] = useState("")
    const [options] = useState({
        accountInfo:false,
        newOrders:false,
        currentOrder: false,
        deliveredOrders: false,
        seeOrder: false
    })
    const [orderId, setOrderId] = useState(0)

    const {user} = useContext(UserContext)

    const updateFieldValue = useCallback((key) => {
        options[key] = true
    }, [options])


    useEffect(() => {
        let activeListItem = window.location.pathname.substring(1).split("/")[1]
        activeListItem = activeListItem.replaceAll("-", " ")
        setListItemActive(activeListItem)

        const secondParam = window.location.pathname.substring(1).split("/")[2]
        if(activeListItem === "delivered orders" && /^\d+$/.test(secondParam)) {
            updateFieldValue("seeOrder")
            setOrderId(secondParam)
        } else {
            const activeListItemWords = activeListItem.split(" ")
            for(let i = 1; i < activeListItemWords.length; i++) {
                activeListItemWords[i] = activeListItemWords[i][0].toUpperCase() + activeListItemWords[i].substring(1)
            }
            const currentOption = activeListItemWords.join("")
            updateFieldValue(currentOption)
        }

    }, [updateFieldValue])

    const buildListItem = listItem => {
        return listItem.replaceAll(" ", "-")
    }

    return(
        <Fragment>
            <DeliverNavbar/> <br/>
            <Container>
                <Row>
                    <Col md={3}>
                        <ListGroup variant="flush" style={{boxShadow:"1px 1px 4px 4px lightgrey"}}>
                                {
                                    listItems.map((listItem, i) => <ListGroup.Item key={i} active={listItems[i] === listItemActive} 
                                                                                action href={"/deliver-account/"+ buildListItem(listItem)}>
                                        {listItem.charAt(0).toUpperCase() + listItem.slice(1)}
                                    </ListGroup.Item>)
                                }
                        </ListGroup>
                    </Col>
                    <Col md={9}>
                        {
                            options.accountInfo? <DeliverAccountInfo deliver={user}/>:
                            options.deliveredOrders? <DeliveredOrders orders={user.orders}/>:
                            options.currentOrder? <DeliverCurrentOrder deliver={user}/>:
                            options.newOrders? <NewReceivedOrders/>:
                            options.seeOrder? <Order orderId={orderId}/>: null
                        }
                    </Col>
                </Row>
            </Container>
        </Fragment>
    )

}

export default DeliveryUserAccountMenu