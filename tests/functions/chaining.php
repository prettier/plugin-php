<?php
one()->two();
one()
    ->two()
    ->three();
one()
    ->two->three()
    ->four->five();

Route::prefix('api')
    ->middleware('api')
    ->namespace($this->namespace)
    ->group(base_path('routes/api.php'));

return tap($this->forceFill([
    'approver_id' => $user instanceof User ? $user->id : $user,
    'approved_at' => $this->freshTimestamp(),
]))->save();

return collect(parent::jsonSerialize())->mapWithKeys(function ($value, $key) {
    return [camel_case($key) => $value];
})->toArray();
