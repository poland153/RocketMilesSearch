var RocketMilesHomepage = function() {
	this.destinationInput = element.all(by.model('searchForm.params.location')).get(1);
	this.destinationInputDropdown = element(by.className('tt-dropdown-menu'));
	this.newUserCloseButton = element(by.xpath("//div[@id='new-sign-up-modal']//button[@class='close']"));
	this.noOffersAvailablePopUp = element(by.xpath("//div[@class='popover-content']"));

	this.clickNewUserCloseButton = function() {
		element(by.xpath("//div[@id='new-sign-up-modal']//button[@class='close']")).click();
	};

	this.getDestinationInputDropdownDefaultOptions = function() {
		return element.all(by.xpath("//div[(@class='tt-dataset-currentLocation') or (@class='tt-dataset-suggestedPlaces')]")).map(function(elm) {
  			return elm.getText();
		});
	};

	this.getDestinationInputDropdownSearchResults = function() {
		return element.all(by.xpath("//div[@class='tt-dataset-placePredictions']//div[@class='tt-suggestion']")).map(function(elm) {
  			return elm.getText();
		});
	};


};

describe('Search destination input', function() {
	var rocketMilesHomepage = new RocketMilesHomepage();
	beforeEach(function() {
		browser.ignoreSynchronization = true;
		browser.get('https://www.rocketmiles.com/');
		browser.sleep(2000);
	});

	it('should display location pin with correct placeholder text', function() {
		rocketMilesHomepage.clickNewUserCloseButton();
		expect(rocketMilesHomepage.destinationInput.getCssValue('background-image')).toContain('/icons/icon-map-marker@2x-bebe1f319a3f3307b86a1356803c032e.png")');
		expect(rocketMilesHomepage.destinationInput.getAttribute('placeholder')).toEqual('Where do you need a hotel?');
	});

	it('should display dropdown after click with current location and top locations', function() {
		rocketMilesHomepage.destinationInput.click();
		expect(rocketMilesHomepage.destinationInputDropdown.isDisplayed()).toBe(true);

		var expectedList = [
			"Current Location",
			"TOP DESTINATIONS\nNew York City, NY, United States\nChicago, IL, United States\nLondon, United Kingdom\nSan Francisco, CA, United States\nTokyo, Japan (東京)\nLos Angeles, CA, United States\nToronto, ON, Canada\nBoston, MA, United States\nVancouver, BC, Canada\nLas Vegas, NV, United States"
		];
		var actualList = rocketMilesHomepage.getDestinationInputDropdownDefaultOptions();
		expect(actualList).toEqual(expectedList);
	});

	it('should display text after its inputed', function() {
		var expected = 'Chicago';
		rocketMilesHomepage.destinationInput.sendKeys(expected);
		var actual = rocketMilesHomepage.destinationInput.getAttribute('value');
		expect(actual).toEqual(expected);
	});

	it('should display dropdown with locations that match inputed text', function() {
		var expected = 'Chicago';
		rocketMilesHomepage.destinationInput.sendKeys(expected);
		browser.sleep(500);
		var actualList = rocketMilesHomepage.getDestinationInputDropdownSearchResults();
		for(var i = 0; i < actualList.length; i++){
			expet(actualList[i]).toContain(expected);
		}
	});

	it('should display No Offers Available when junk text is inputed', function() {
		var junkString = 'asdfqwerty';
		rocketMilesHomepage.destinationInput.sendKeys(junkString);
		browser.sleep(2000);
		expect(rocketMilesHomepage.noOffersAvailablePopUp.isDisplayed()).toBeTruthy();
		expect(rocketMilesHomepage.noOffersAvailablePopUp.getText()).toEqual('No offers available');
	});
	


});