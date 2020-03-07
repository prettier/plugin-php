<?php

$variable = FormUtil::isEmpty($this->modelData) ||
    // arrays, countables
    ((is_array($this->modelData) || $this->modelData instanceof \Countable) && 0 === count($this->modelData)) ||
    // traversables that are not countable
    ($this->modelData instanceof \Traversable && 0 === iterator_count($this->modelData));

if (2 /* MB_OVERLOAD_STRING */ & (int) ini_get('mbstring.func_overload')) {
    mb_internal_encoding('ASCII');
}

$bool = /*Comment */ true /*Comment */ || /*Comment */ false /*Comment */;

$a = 1
    * // A
    2
    * // B
    3;

//check if the offer applies to this site
//state mismatch
if (
    !$this->pricingQueryOfferResult->offer ||
    !$this->pricingQueryOfferResult->offer->offerGroup ||
    //!$this->pricingQuerySite->postcode ||
    ( // offer has a state but we don't
        $this->pricingQueryOfferResult->offer->offerGroup->state_id
        && !$this->pricingQuerySite->postcode->state_id
    ) ||
    ( // if we have a state and the offer has a state and they don't match, reject
        $this->pricingQuerySite->postcode
        && $this->pricingQuerySite->postcode->state_id
        && $this->pricingQueryOfferResult->offer->offerGroup->state_id
        && $this->pricingQuerySite->postcode->state_id != $this->pricingQueryOfferResult->offer->offerGroup->state_id
    )
) {
    $this->hasResult = false;
    $this->removedReason = 'State Mismatch';
}

if ($bool0
    || $bool1 // if condition 1
    || $bool2 // if condition 2
) {
    $ok = true;
}