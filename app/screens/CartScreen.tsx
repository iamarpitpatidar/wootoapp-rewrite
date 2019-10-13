import { Attribute, Product, Variation } from "../types/woocommerce";
import { Icon, Image, Text, ListItem } from "react-native-elements";
import { Dimensions, SafeAreaView, ScrollView, View } from "react-native";
import { ICart, ICartLineItem } from "../reducers/cart";

import Actions from "../actions";
import CartLineItem from "../components/CartLineItem";
import Button from "../components/Button";
import React from "react";
import { connect } from "react-redux";
import FooterNavigationArea from "../components/FooterNavigationArea";
import { rules } from "../styles";

export interface ICartScreenProps {
	navigation: {
		state: {
			params: {
				product: Product;
			};
		};
	};

	cart: ICart;
	goBack: () => void;
}

export interface ICartScreenState {}

const SubtotalLineItem = connect(
	(store, ownProps) => {
		return { cart: store.cart };
	},
	dispatch => {
		return {};
	}
)(props => {
	let total = 0;
	props.cart.lineItems.map((li: ICartLineItem) => {
		total += li.totalLine;
	});
	return <ListItem title={<Text>{total}</Text>} />;
});

class CartScreen extends React.Component<ICartScreenProps, ICartScreenState> {
	state = {};

	static navigationOptions = ({ navigation, navigationOptions }) => {
		return {
			title: "View Cart",
			backButton: true,
		};
	};

	constructor(props: ICartScreenProps) {
		super(props);
	}

	render() {
		const { height } = Dimensions.get("window");
		const { cart } = this.props;

		const effectiveHeight = height - rules.headerHeight;
		return (
			<View
				accessibilityLabel={"cartScreenBaseView"}
				style={{
					flex: 1,
					height: effectiveHeight,
					flexDirection: "column",
				}}
			>
				<ScrollView style={{ flex: 1 }}>
					{cart.lineItems.map((li: ICartLineItem) => {
						return <CartLineItem lineItem={li} />;
					})}

					<SubtotalLineItem />
				</ScrollView>
				<View>
					<FooterNavigationArea>
						<Button title="Proceed to Checkout" style={{ flex: 1 }} />
					</FooterNavigationArea>
				</View>
			</View>
		);
	}
}

const select = (store, ownProps: ICartScreenProps) => {
	return {
		cart: store.cart,
	};
};

const actions = dispatch => {
	const {} = Actions;
	return {};
};

export default connect(
	select,
	actions
)(CartScreen);
