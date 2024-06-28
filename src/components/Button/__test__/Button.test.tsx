import { describe, expect, jest, test } from "@jest/globals";
import { fireEvent, render, screen } from "@testing-library/react-native";
import { Button } from "..";

describe("<App />", () => {
  test("Buton Snapshot", () => {
    const onPress = jest.fn();
    const view = render(<Button text="Cihan" onPress={onPress} />);

    expect(view).toMatchSnapshot();
  });
  test("Buton testi ", () => {
    const onPress = jest.fn();
    render(<Button text="Cihan 2" onPress={onPress} />);
    const text = screen.getByTestId("btnText");
    expect(text.props.style.fontFamily).toBe("AvenirLTProBlack");
  });
  test("buton tik", () => {
    const onPress = jest.fn();
    render(<Button text="Cihan 2" onPress={onPress} />);
    const btn = screen.getByTestId("btn");
    fireEvent.press(btn);
    expect(onPress).toHaveBeenCalled();
    expect(onPress).toHaveBeenCalledWith();
  });
});
