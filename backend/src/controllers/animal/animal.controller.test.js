const { mockRequest, mockResponse } = require('jest-mock-req-res');

const animalController = require('./animal.controller');
const animalService = require('./animal.service');

jest.mock('./animal.service');

describe("animal controler", () => {
    const mockData = [{
        "_id": "123qw",
        "name": "Szíriai aranyhörcsög",
        "category": "Rágcsáló",
        "subCategory": "Hörcsög",
        "description": "Az aranyhörcsögök az egyik leggyakrabban tartott rágcsálók, hiszen könnyen megszelídíthetőek és szinte biztos, hogy elérhetőek minden kisállat kereskedésben. Általában 4 évig élnek, körülbelül 17 cm-esre nőnek meg és 200 grammot nyomnak. Kíváncsi természetük miatt igénylik az ingereket, és hogy sokat foglalkozzunk velük. Igazi kis szabadulóművészek, ezért nagyon ügyelnünk kell arra, hogy kellően magas legyen a terrárium, vagy, hogy elég sűrűn legyenek a ketrec rácsai. Fontos tudni róluk, hogy magányosan szeretnek élni, nem szívesen osztják meg a területüket más hörcsögökkel. Ha mégis két kisemlőst szeretnénk, akkor kicsi koruktól kezdve együtt élő párt kell választanunk, különben halálos sérülésekkel járó verekedések szemtanúi lehetünk.",
        "img": "...",
        "price": 700,
        "active": true
    },
    {
        "_id": "123we",
        "name": "Dzsungáriai törpehörcsög",
        "category": "Rágcsáló",
        "subCategory": "Hörcsög",
        "description": "A törpehörcsög kifejezés több faj esetében is használható, az egyik közülük a Dzsungáriai törpehörcsög. Ők sokkal inkább kijönnek egymással, mint az aranyhörcsögök, ennek köszönhetően tarthatóak párban vagy többedmagukkal is. Könnyen kezelhetőek és nem igényelnek túl sok gondozást. Azt viszont fontos észben tartanunk, hogy ezek az apróságok jellemzően harapósak. Rendszeres foglalkozással viszont leszoktathatóak róla. Maximum 7-8 centisre nőnek, és 50-60 gramm súlyúak.",
        "img": "...",
        "price": 900,
        "active": false
    },
    {
        "_id": "123er",
        "name": "Roborovszki törpehörcsög",
        "category": "Rágcsáló",
        "subCategory": "Hörcsög",
        "description": "A Roborovszki törpehörcsögök a legkisebbek és leggyorsabbak a hörcsögök közül. Csak a saját fajtájukkal képesek kijönni, és nem szeretik, ha kézbe vesszük és babusgatjuk őket. Nézni viszont szabad. Egyszerre félénk és kíváncsi természetűek. Szelídek, ritkán harapnak. A felnőttek sem nagyobbak, mint egy emberi hüvelykujj, így a szökésbiztos rágcsálólakra nagy figyelmet kell fordítanunk.",
        "img": "...",
        "price": 1000,
        "active": false
    }];

    let response;
    const nextFunction = jest.fn();

    beforeEach(() => {
        animalService.__setMockData(mockData);
        response = mockResponse();
    });

    test("find one with valid id", () => {
        const animal_ID = 1;

        const request = mockRequest({
            params: {
                id: animal_ID
            }
        });

        return animalController.findOne(request, response, nextFunction)
            .then(() => {
                expect(animalService.findOne).toBeCalledWith(animal_ID);
                expect(response.json).toBeCalledWith(
                    mockData.find(animal => animal._id === animal_ID)
                );
            })
    });
});
