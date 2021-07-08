import React from 'react';

export default function ProductSpecs({ data }) {
    var items = [];

    const { specs, topLevelCategory } = data

    if (specs) {
        HIDDEN_SPECS.forEach(item => {
            delete specs[item]
        })

        if (topLevelCategory && SPEC_ORDER.hasOwnProperty(topLevelCategory.name)) {

            for (const id in SPEC_ORDER[topLevelCategory.name]) {
                const key = SPEC_ORDER[topLevelCategory.name][id]
                if (specs.hasOwnProperty(key) === true) {
                    items.push(<ProductSpecRow key={key} keyName={key} value={specs[key]} />)
                    delete specs[key]
                }
            }
            const alphaItems = Object.keys(specs).sort().map(function (keyName, keyIndex) {
                return <ProductSpecRow key={keyName} keyName={keyName} value={specs[keyName]} />
            })
            items = items.concat(alphaItems)

        } else {
            // Not in our ordered specs, just return alphabetically
            items = Object.keys(specs).sort().map(function (keyName, keyIndex) {
                return <ProductSpecRow key={keyIndex} keyName={keyName} value={specs[keyName]} />
            })
        }
    } else {
        items = <tr><th>n/a</th></tr>
    }

    // console.log(items)

    return (
        <>
            <h2 className="red-bar-below">Specs</h2>
            <table className="table table-striped spec-table">
                <tbody>
                    {items}
                </tbody>
            </table>
        </>
    );
}

function ProductSpecRow(item) {

    var label;
    var details = new Array();

    if (typeof item.value === 'string') {
        label = SPEC_NAME_MAPPING[item.keyName]

        const specList = item.value.split('\n').filter(item => item.length !== 0);

        const specs = specList.map((value, index) => {
            return <li key={index}>{value}</li>
        })

        details.push(
            <tr key={item.keyName}>
                <th>{label}</th>
                <td>
                    <ul className="mb-0">
                        {specs}
                    </ul>
                </td>
            </tr>
        )

    } else if (typeof item.value === 'object') {
        // formatted item needs to be some sort of component displaying key and value
        Object.keys(item.value).map(function (keyName, keyIndex) {

            if (item.keyName in SPEC_NAME_MAPPING) {
                label = SPEC_NAME_MAPPING[item.keyName][keyName]
            } else {
                label = keyName
            }

            const specList = item.value[keyName].split('\n').filter(item => item.length !== 0);

            const specs = specList.map((value, index) => {
                return <li key={index}>{value}</li>
            })

            details.push(
                <tr key={keyName}>
                    <th>{label}</th>
                    <td>
                        <ul className="mb-0">
                            {specs}
                        </ul>
                    </td>
                </tr>
            )
        })
    } else if (typeof item.value === 'number') {
        label = SPEC_NAME_MAPPING[item.keyName]
        details.push(
            <tr key={item.keyName}>
                <th>{label}</th>
                <td>
                    <ul className="mb-0">
                        <li key={item.keyName}>{item.value}</li>
                    </ul>
                </td>
            </tr>
        )
    } else {
        details = <div>N/A</div>;
    }

    return details
}

const SPEC_NAME_MAPPING = {
    "microsoftNETFrameworkRequirements": "Microsoft .NET Framework Requirements",
    "accessLevelsinSystem": "Access Levels in System",
    "SQLDatabaseEngineCompatibility": "SQL Database Engine Compatibility",
    "zonesinSystem": "Zones in System",
    "networkConnectiontoServer": "Network Connection to Server",
    "processor": "Processor",
    "platform": "Platform",
    "expirationPeriod": "Expiration Period",
    "additionalPluginsRequired": "Additional Plug-ins Required",
    "plugin": "Plugins",
    "calendarsinSystem": "Calendars In System",
    "serverOperativeSystem": "Server Operating System",
    "maximumNumberofDoorsPerSystem": "Maximum Number of Doors Per System",
    "webBrowser": "Web Browser",
    "maximumNumberofUsersPerDoor": "Maximum Number of Users Per Door",
    "timeZones": "Time Zones",
    "hardwareRequirements": "Hardware Requirements",
    "RAM": "RAM", 
    "firerating": "Fire Rating",
    "optionalArms": "Optional Arms",
    "springs": "Springs",
    "valves": "Valves",
    "box": {
        "quantity": "Box Quantity",
        "length": "Box Length",
        "width": "Box Width",
        "weight": "Box Weight",
        "height": "Box Height"
    },
    "productNumber": "Product Number",
    "certifications": "certifications",
    "cover": "Cover",
    "optionalBrackets": "Optional Brackets",
    "material": "material",
    "specialnote2": "Special Note 2",
    "fasteners": "fasteners",
    "specialnote1": "Special Note 1",
    "handing": "Handling",
    "warranty": "Warranty",
    "maximumDoor": "Maximum Door",
    "arm": "Arm",
    // "case": "Case",
    "productDescription": "Product Description",
    "applications": "Applications",
    "siren": "Siren",
    "diameterOfRod": "Diameter of Rod",
    "functions": "Functions",
    "springs": "Springs",
    "steelBolt": "Steel Bolt",
    "valves": "Valves",
    "mechanical": "Mechanical",
    "type": "Type",
    "cover": "Cover",
    "fastenersize-wood": "Fastener Size - Wood",
    "specialFeatures": "Special Features",
    "maximumMountingHeight": "Maximum Mounting Height",
    "trim": "Trim",
    "applicationFeatures": "Application Features",
    "fastenerholes": "Fastener Holes",
    "price": "Price",
    "engagedStrikeProjectionWalltoDoor": "Engaged Strike Projection Wall to Door",
    "options": "Options",
    "standardOpeningRange": "Standard Opening Range",
    "packagedSets": "Packaged Sets",
    "warranty": "Warranty",
    "catch": "Catch",
    "codeCompliance": "Code Compliance",
    "case": {
        "quantity": "Case Quantity"
    },
    "length": "Case Length",
    "width": "Case Width",
    "weight": "Case Weight",
    "pack": "Case Pack",
    "additionalOptions": "Additional Options",
    "height": "Case Height",
    "mountTotalProjection": "Mount Total Projection",
    "productDescription": "Product Description",
    "barrelDiameter": "Barrel Diameter",
    "height": "Height",
    "gauge": "Gauge",
    "models": "Models",
    "armsAndBrackets": "Arms and Brackets",
    "constructionBody": "Construction Body",
    "pushBarProjection": "Push Bar Projection",
    "size": "Size",
    "stop": "Stop",
    // "throw": "Throw",
    "deadboltThrow": "Deadbolt Throw",
    "latchboltThrow": "Latchbolt Throw",
    "conformsTo": "Conforms To",
    "quickship": "Quickship",
    "loadRating": "Load Rating",
    "lettering": "Lettering",
    "frameReinforcement": "Frame Reinforcement",
    "standardLengths": "Standard Lengths",
    "escutcheonType": "Escutcheon Type",
    "systemIncludes": "System Includes",
    "beveledLipProjection": "Bevel Lip Projection",
    "colors": "Colors",
    "LEDIndicators": "LED Indicators",
    "electricalSpecifications": "Electrical Specifications",
    "current": "Current",
    "standardFeatures": "Standard Features",
    "installation": "Installation",
    "handing": "Handing",
    "replacementKitContains": "Replacement Kit Contains",
    "clearance": "Clearance",
    "finishes": "Finishes",
    "topFitting": "Top Fitting",
    "arm": "Arm",
    "packagequantity": "Package Quantity",
    "engagedProjection": "Engaged Projection",
    "howtoorder": "How to Order",
    "standardMountingFasteners": "Standard Mounting Fasteners",
    "accessories": "Accessories",
    "strikeLipLength": "Strike Lip Length",
    "fastenerHoleQuantity": "Fastener Hole Quantity",
    "escutcheons": "Escutcheons",
    "cylindersCores": "Cylinders/Cores",
    "gloviaPartNumber": "Glovia Part Number",
    "keyway": "Keyway",
    "cupClearance": "Cup Clearance",
    "designFeatures": "Design Features",
    "depth": "Depth",
    "optionalBrackets": "Optional Brackets",
    "fastenersize-machine": "Fastener Size - Machine",
    "productDame": "Product Name",
    "width": "Width",
    "countryoforigin": "Country of Origin",
    "fastenersize": "Fastener Size",
    "cylinderCutoutDiameter": "Cylinder Cutout Diameter",
    "pushBar": "Push Bar",
    "keying": "Keying",
    "bottomProjection": "Bottom Projection",
    "outputs": "Outputs",
    "availableOn": "Available On",
    "notes": "Notes",
    "optionalArms": "Optional Arms",
    "thickness": "Thickness",
    "notes": "Notes",
    "optionalArms": "Optional Arms",
    "thickness": "Thickness",
    "inputs": "Inputs",
    "use": "Use",
    "quantities": "Quantities",
    "stocknumber": "Stock Number",
    "deadlock": "Deadlock",
    "specifications": "Specifications",
    "frequency": "Frequency",
    "features": "Features",
    "currentDraw": "Current Draw",
    "diameter": "Diameter",
    "totalProjection": "Total Projection",
    "fastenersizes-HeadCamBox": "Fastener Sizes – Head Cam Box",
    "batteryBackupOption": "Battery Backup Option",
    "maximumOpening": "Maximum Opening",
    "operatingTemperature": "Operating Temperature",
    "electricmodifications": "Electric Modifications",
    "batteryCharger": "Battery Charger",
    "armsAndAssemblies": "Arms and Assemblies",
    "offset": "Offset",
    "weight": "Weight",
    "includes": "Includes",
    "productNumber": "Product Number",
    "availableSizes": "Available Sizes",
    "maximumDegreeofSwing": "Maximum Degree of Swing",
    "lengthOptions": "Length Options",
    "mountingStyle": "Mounting Style",
    "loadCapacity": "Load Capacity",
    "moduleOptions": "Module Options",
    "optionalFeatures": "Optional Features",
    "leverOptions": "Lever Options",
    "backsets": "Backsets",
    "keys": "Keys",
    "pocketApplications": "Pocket Applications",
    "websitenote": "Website Note",
    "exposedTrim": "Exposed Trim",
    "functionsSelection": "Functions Selection",
    "units": "Units",
    "armLength": "Arm Length",
    "barrelPlungerDiameter": "Barrel Plunger Diameter",
    "holdingForce": "Holding Force",
    "fastenersizes-FloorCamBox": "Fastener Sizes - Floor Cam Box",
    "knuckles": "Knuckles",
    "construction": "Construction",
    "projection": "Projection",
    "operationalFunctionality": "Operational Functionality",
    "holecount": "Hole Count",
    "shims": "Shims",
    "headerLengths": "Header Lengths",
    "standardDoorPrep": "Standard Door Prep",
    "length": "Length",
    "programmableFunctionality": "Programmable Functionality",
    "packaging": "Packaging",
    "certifications": "Certifications",
    "pushandPullLevers": "Push and Pull Levers",
    "voltage": "Voltage",
    "environment": "Environment",
    "includedFeatures": "Included Features",
    "material": "Material",
    "fasteners": "Fasteners",
    "deadbolt": "Deadbolt",
    "optionalFinish": "Optional Finish",
    "latchboltType": "Latchbolt Type",
    "SFICCylinderLength": "SFIC Cylinder Length",
    "applications": "Applications",
    "faceplate": {
        "type": "Faceplate Type",
        "length": "Faceplate Length",
        "width": "Faceplate Width",
        "height": "Faceplate Height",
        "quantity": "Faceplate Quantity",
        "faceplate": "Faceplate"
    },
    "quantity": "Quantity",
    "armature": {
        "depth": "Armature Depth",
        "length": "Armature Length",
        "width": "Armature Width",
        "height": "Armature Height"
    },
    "basePlate": {
        "length": "Base Plate Length",
        "width": "Base Plate Width",
        "height": "Base Plate Height"
    },
    "1gang": {
        "width": "1 Gang Width",
        "gauge": "1 Gang Gauge",
        "height": "1 Gang Height"
    },
    "casePack": {
        "length": "Case Pack Length",
        "width": "Case Pack Width",
        "weight": "Case Pack Weight",
        "height": "Case Pack Height"
    },
    "forend": {
        "length": "Forend Length",
        "width": "Forend Width",
        "height": "Forend Height"
    },
    "knob": {
        "diameter": "Knob Diameter",
        "projection": "Knob Projection"
    },
    "standardSize": {
        "length": "Standard Size Length",
        "width": "Standard Size Width",
        "height": "Standard Size Height"
    },
    "armBracketBase": {
        "length": "Arm Bracket Length",
        "width": "Arm Bracket Base Width",
        "height": "Arm Bracket Base Height"
    },
    "topPlate": {
        "length": "Top Plate Length",
        "width": "Top Plate Base Width",
        "height": "Top Plate Base Height"
    },
    "strike": {
        "size": "Strike Size",
        "strikes": "Strikes",
        "length": "Strike Length",
        "width": "Strike Width",
        "projection": "Strike Projection ",
        "base": "Strike Base ",
        "height": "Strike Height "
    },
    "anchorHousing": {
        "length": "Anchor Housing Length",
        "width": "Anchor Housing Width",
        "height": "Anchor Housing Height "
    },
    "pull": {
        "CTC": "Pull CTC",
        "diameter": "Pull Diameter",
        "clearance": "Pull Clearance",
        "overall": "Pull Overall"
    },
    "rose": {
        "diameter": "Rose Diameter",
        "thickness": "Rose Thickness",
    },
    "door": {
        "thickness": "Door Thickness",
        "width": "Door Width",
        "clearance": "Door Clearance",
        "reinforcement": "Door Reinforcement",
        "specifications": "Door Specifications",
        "status": "Door Status"
    },
    "carton": {
        "quantity": "Carton Quantity",
        "length": "Carton Length",
        "width": "Carton Width",
        "height": "Carton Height",
        "weight": "Carton Weight"
    },
    "deadboltFaceplate": {
        "length": "Deadbolt Faceplate Length",
        "width": "Deadbolt Faceplate Width",
        "height": "Deadbolt Faceplate Height",
    },
    "body": {
        "thickness": "Body Thickness",
        "width": "Body Width",
        "height": "Body Height",
    },
    "pin": {
        "diameter": "Rose Diameter",
        "type": "Pin Type"
    },
    "maximumDoor": {
        "thickness": "Maximum Door Thickness",
        "length": "Maximum Door Length",
        "width": "Maximum Door Width",
        "weight": "Maximum Door Weight",
        "height": "Maximum Door Height",
    },
    "lockBody": {
        "length": "Lock Body Length",
        "width": "Lock Body Width",
        "height": "Lock Body Height",
    },
    "weight": "Weight",
    "armorFront": {
        "length": "Armor Front Length",
        "width": "Armor Front Width",
        "height": "Armor Front Height",
    },
    "bolt": {
        "diameter": "Bolt Diameter",
        "backset": "Bolt Backset",
        "throw": "Bolt Throw",
        "length": "Bolt Length",
        "width": "Bolt Width",
        "bolt": "Bolt",
        "height": "Bold Height"
    },
    "bumper": {
        "diameter": "Bumper Diameter",
        "height": "Bumper Height"
    },
    "track": {
        "length": "Track Length",
        "width": "Track Width",
        "height": "Track Height",
    },
    "shackle": {
        "diameter": "Shackle Diameter",
        "height": "Shackle Height",
    },
    "base": {
        "length": "Base Length",
        "width": "Base Width",
        "height": "Base Height",
        "projection": "Base Projection",
        "diameter": "Base Diameter",
        "thickness": "Base Thickness",
        "ofCenterToRail": "Base of Center to Rail",
    },
    "reinforcement": "Reinforcement",
    "strikes": "Strikes",
    "CTC": {
        "length": "CTC Length",
        "CTC": "CTC"
    },
    "managementSoftware": "Management Software",
    "powerSourceConnection": "Power Source/Connection",
    "securityRequirements": "Security Requirements",
    "dogging": "Dogging",
    "coverTube": "Cover Tube",
    "endCaps": "End Caps",
    "stileWidth": "Stile Width",
    "rodLength": "Rod Length",
    "reveal": "Reveal",
    "mountingKits": "Mounting Kits"
}

const SPEC_ORDER = {
    "Locks": ["certifications", "finishes", "functions", "leverOptions", "cylindersCores"],
    "Door Controls": ["certifications", "size", "material", "finishes", "armsAndBrackets"],
    "Exit Devices": ["certifications", "finishes", "door", "strike", "trim"],
    "Commercial Hinges": ["certifications", "materials", "finishes", "electricmodifications"],
    "Residential Hinges": ["materials", "finishes", "packaging", "notes"],
    "Roton": ["certifications", "materials", "lengthOptions", "fasteners", "electricmodifications"],
    "Stainless Steel Continuous Hinges": ["certifications", "materials", "lengthOptions", "fasteners", "electricmodifications"],
    "Trim & Auxiliary": ["certifications", "materials", "finishes", "fasteners"],
    "Thresholds and Weatherstripping": ["certifications", "materials", "finishes", "inserts", "fasteners"],
    "Access Control": ["certifications", "lockType", "platform"],
    "HS4": ["certifications", "lockType", "platform"],
}

const HIDDEN_SPECS = ["applications", "PID"]