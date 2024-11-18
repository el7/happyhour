-- Exported from QuickDBD: https://www.quickdatabasediagrams.com/
-- NOTE! If you have used non-SQL datatypes in your design, you will have to change these here.

-- Modify this code to update the DB schema diagram.
-- To reset the sample schema, replace everything with
-- two dots ('..' - without quotes).

CREATE TABLE "Restaurant" (
    "intRestaurantID" int   NOT NULL,
    "strRestaurantName" string   NOT NULL,
    "strRestaurantAddress1" string   NOT NULL,
    "strRestaurantAddress2" string   NULL,
    "strRestaurantAddress3" string   NULL,
    "strRestaurantPhoneNumber" string   NULL,
    "strRestaurantWebsite" string   NULL,
    "strRestaurantNote" string   NULL,
    CONSTRAINT "pk_Restaurant" PRIMARY KEY (
        "intRestaurantID"
     )
);

CREATE TABLE "Hours" (
    "intHoursID" int   NOT NULL,
    "intDayOfWeek" int   NOT NULL,
    "dtOpen" dateTime   NOT NULL,
    "dtClose" dateTime   NOT NULL,
    "intRestaurantID" int   NOT NULL,
    CONSTRAINT "pk_Hours" PRIMARY KEY (
        "intHoursID"
     )
);

CREATE TABLE "RestaurantAttributes" (
    "intAttributeID" int   NOT NULL,
    "strAttributeName" string   NOT NULL,
    "strAttributeNote" string   NULL,
    "intRestaurantID" int   NOT NULL,
    CONSTRAINT "pk_RestaurantAttributes" PRIMARY KEY (
        "intAttributeID"
     )
);

CREATE TABLE "Specials" (
    "intSpecialID" int   NOT NULL,
    "strSpecialName" string   NOT NULL,
    "strSpecialNote" string   NULL,
    "dtSpecialLastConfirmed" dateTime   NOT NULL,
    "intRestaurantID" int   NOT NULL,
    CONSTRAINT "pk_Specials" PRIMARY KEY (
        "intSpecialID"
     )
);

CREATE TABLE "SpecialDays" (
    "intSpecialDayID" int   NOT NULL,
    -- 0 == monday, 6 = sunday
    "intDayOfWeek" int   NOT NULL,
    "dtSpecialStartTime1" dateTime   NOT NULL,
    "dtSpecialStartTime2" dateTime   NOT NULL,
    "dtSpecialEndTime1" dateTime   NOT NULL,
    "dtSpecialEndTime2" dateTime   NOT NULL,
    "intSpecialID" int   NOT NULL,
    CONSTRAINT "pk_SpecialDays" PRIMARY KEY (
        "intSpecialDayID"
     )
);

CREATE TABLE "SpecialDetails" (
    "intSpecialDetailID" int   NOT NULL,
    "strSpecialDetailName" string   NOT NULL,
    "intDealValue" int   NOT NULL,
    "strDealModifier" string   NOT NULL,
    "strDealNote" string   NULL,
    "strDealType" string   NOT NULL,
    "intSpecialID" int   NOT NULL,
    CONSTRAINT "pk_SpecialDetails" PRIMARY KEY (
        "intSpecialDetailID"
     )
);

ALTER TABLE "Hours" ADD CONSTRAINT "fk_Hours_intRestaurantID" FOREIGN KEY("intRestaurantID")
REFERENCES "Restaurant" ("intRestaurantID");

ALTER TABLE "RestaurantAttributes" ADD CONSTRAINT "fk_RestaurantAttributes_intRestaurantID" FOREIGN KEY("intRestaurantID")
REFERENCES "Restaurant" ("intRestaurantID");

ALTER TABLE "Specials" ADD CONSTRAINT "fk_Specials_intRestaurantID" FOREIGN KEY("intRestaurantID")
REFERENCES "Restaurant" ("intRestaurantID");

ALTER TABLE "SpecialDays" ADD CONSTRAINT "fk_SpecialDays_intSpecialID" FOREIGN KEY("intSpecialID")
REFERENCES "Specials" ("intSpecialID");

ALTER TABLE "SpecialDetails" ADD CONSTRAINT "fk_SpecialDetails_intSpecialID" FOREIGN KEY("intSpecialID")
REFERENCES "Specials" ("intSpecialID");

CREATE INDEX "idx_Restaurant_strRestaurantName"
ON "Restaurant" ("strRestaurantName");

