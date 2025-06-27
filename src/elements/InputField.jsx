import { InputAdornment, TextField } from '@mui/material';
import React from 'react';
//varient: outlined, filled

export const InputField = (props) => {
  return (
      <TextField 
        name={props?.name} 
        label={props?.label}
        type={props?.type} 
        variant={props?.variant || "outlined"}
        size={props?.inputsize}
        hiddenLabel={props?.hiddenLabel || false}
        value={props?.value} 
        error={props?.validation}
        onChange={(event) => {props?.handleOnChange(event)}}
        disabled={props?.disabled || false}
        fullWidth={props?.fullWidth || false}
        sx={{
          "& label": {
            display: props?.value?.length > 0 ? "none" : "block",
            color: props?.inputcolor,
          },
          "& label.Mui-focused": {
            display: "none",
          },
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderWidth: "2px",
              borderColor: props?.inputcolor,
              borderRadius: props?.inputradius,
            },
            "&:hover fieldset": {
              borderWidth: "3px",
              borderColor: props?.inputcolor,
            },
            "&.Mui-focused": {
              "fieldset": {
                borderColor: props?.inputcolor,
              }
            },
            "& legend": {
              width: "0%",
            },
          },
          "& input:-webkit-autofill": {
            WebkitBoxShadow: "0 0 0 100px black inset !important",
            WebkitTextFillColor: "white !important",
            WebkitBorderRadius: props?.inputradius
          },
        }}
        InputProps={{
          endAdornment: (
            props?.endicon 
            ? <InputAdornment position="end">
              <div style={{ height:"100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                {props?.name === "password" ? 
                  <img 
                    name={props?.iconname} 
                    style={{ width: "30px", cursor: "pointer" }} 
                    src={new URL(props?.data?.showPassword 
                      ? `../assets/buttonIcon/EyeOpen.png` 
                      : `../assets/buttonIcon/EyeBlind.png`, import.meta.url).href} 
                    alt={props?.data?.showPassword ? 'EyeOpen' : 'EyeBlind'} 
                    onClick={(event) => {props?.handleOnChange(event)}} 
                  /> 
                  : 
                  <img 
                    name={props?.iconname} 
                    style={{ width: "30px", cursor: "pointer" }} 
                    src={new URL(props?.data?.showRePassword 
                      ? `../assets/buttonIcon/EyeOpen.png` 
                      : `../assets/buttonIcon/EyeBlind.png`, import.meta.url).href} 
                    alt={props?.data?.showRePassword ? 'EyeOpen' : 'EyeBlind'} 
                    onClick={(event) => {props?.handleOnChange(event)}} 
                  />}
              </div>
            </InputAdornment> 
            : null
          ),
          style: {
            color: props?.textcolor,
            fontSize: props?.textsize,
            width: props?.width ? props?.width : "auto",
          },
        }}
      />
  )
}
